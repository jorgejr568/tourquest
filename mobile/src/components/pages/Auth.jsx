import { FlatList, View } from "react-native";
import withAuth from "../../middlewares/auth.middleware";
import { Button, List, useTheme } from "react-native-paper";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";
import API from "../../API";
import firstName from "../../utils/firstName";
import ManWalkingAnimation from "../atoms/ManWalkingAnimation";
import withLocation from "../../middlewares/location.middleware";
import { useNavigation } from "@react-navigation/native";
import useWatchLocation from "../../hooks/useWatchLocation";
import { BaseLayout } from "../_layout/base";

const randomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const AuthPage = ({ user, location }) => {
  const { token, logout } = useUser();
  const navigation = useNavigation();
  const theme = useTheme();
  const [journey, setJourney] = useState();
  const { connected, lastLocation } = useWatchLocation();

  useEffect(() => {
    API.journeys.all().then((journeys) => {
      const journey = randomElement(journeys);
      setJourney(journey);
    });
  }, []);

  return (
    <BaseLayout>
      <BaseLayout.Navbar title={`Perfil de ${firstName(user.name)}`} />
      <BaseLayout.Content>
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
          {journey && (
            <Button
              mode="outlined"
              onPress={() =>
                navigation.navigate("CheckpointList", {
                  journey,
                })
              }
            >
              {journey.title}
            </Button>
          )}

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
      </BaseLayout.Content>
    </BaseLayout>
  );
};

export default withAuth(withLocation(AuthPage));
