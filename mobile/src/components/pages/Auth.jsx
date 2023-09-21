import { FlatList, SafeAreaView, View } from "react-native";
import withAuth from "../../middlewares/auth.middleware";
import Navbar from "../organisms/Navbar";
import { Button, List, useTheme } from "react-native-paper";
import useUser from "../../hooks/useUser";
import { useEffect, useRef, useState } from "react";
import API from "../../API";
import firstName from "../../utils/firstName";
import ManWalkingAnimation from "../atoms/ManWalkingAnimation";
import withLocation from "../../middlewares/location.middleware";

const AuthPage = ({ user, route, location }) => {
  const { token, logout } = useUser();
  const theme = useTheme();
  const wss = useRef();
  const [lastLocation, setLastLocation] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    wss.current = API.wss.new();
    wss.current.onopen = () => {
      setConnected(true);
    };

    wss.current.onmessage = (e) => {
      const uuidRegex = /([a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8})/gi;
      const matches = e.data.match(uuidRegex);

      if (matches && matches.length > 0) {
        setLastLocation(matches[0]);
      }
    };

    wss.current.onclose = () => {
      setConnected(false);
    };

    return () => {
      wss.current.close();
    };
  }, []);

  useEffect(() => {
    if (!wss.current || wss.current.readyState !== WebSocket.OPEN) return;

    API.wss.sendLocation(wss.current, location.latitude, location.longitude);
  }, [wss.current, location]);

  return (
    <View style={{ flex: 1 }}>
      <Navbar title={`Perfil de ${firstName(user.name)}`} />

      <SafeAreaView
        style={{
          backgroundColor: theme.colors.elevation.level1,
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
            paddingHorizontal: 20,
            paddingTop: 40,
          }}
        >
          <ManWalkingAnimation autoPlay={connected} />

          <FlatList
            data={Object.entries({
              ...user,
              token,
              ...location,
              ...(lastLocation
                ? {
                    lastLocation,
                  }
                : {}),
            })}
            keyExtractor={([key]) => key}
            renderItem={({ item: [key, value] }) => (
              <List.Item
                title={key}
                description={value}
                titleStyle={{ fontWeight: "bold" }}
                descriptionStyle={{ color: theme.colors.text }}
              />
            )}
          />

          <Button onPress={logout}>Logout</Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default withAuth(withLocation(AuthPage));
