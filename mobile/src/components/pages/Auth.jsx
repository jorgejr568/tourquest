import { View, SafeAreaView } from "react-native";
import withAuth from "../../middlewares/auth.middleware";
import Navbar from "../organisms/Navbar";
import { Button, Text, useTheme } from "react-native-paper";
import useUser from "../../hooks/useUser";
import { useEffect, useRef, useState } from "react";
import API from "../../API";

const AuthPage = ({ user }) => {
  const { token, logout } = useUser();
  const theme = useTheme();
  const wss = useRef(API.wss.new());
  const [lastLocation, setLastLocation] = useState();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!wss.current) return;
    wss.current.onopen = () => {
      console.log("connected");
      setConnected(true);
    };

    wss.current.onmessage = (e) => {
      console.log(e.data);
      const uuidRegex = /([a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8})/gi;
      const matches = e.data.match(uuidRegex);

      if (matches && matches.length > 0) {
        setLastLocation(matches[0]);
      }
    };

    return () => {
      wss.current.close();
      console.log("disconnected");
    };
  }, []);

  useEffect(() => {
    if (!wss.current) return;

    let interval = setInterval(() => {
      if (wss.current.readyState !== WebSocket.OPEN) return;

      try {
        API.wss.sendLocation(wss.current, Date.now(), Date.now());
      } catch (e) {
        console.log(e);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [wss.current]);

  return (
    <View style={{ flex: 1 }}>
      <Navbar />

      <SafeAreaView
        style={{
          backgroundColor: theme.colors.elevation.level1,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          paddingHorizontal: 80,
        }}
      >
        <Text variant="displayLarge">Auth</Text>
        <Text>
          {JSON.stringify({ ...user, token, connected, lastLocation }, null, 2)}
        </Text>

        <Button onPress={logout}>Logout</Button>
      </SafeAreaView>
    </View>
  );
};

export default withAuth(AuthPage);
