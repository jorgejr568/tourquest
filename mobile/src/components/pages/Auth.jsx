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
import { useNavigation } from "@react-navigation/native";
import useWatchLocation from "../../hooks/useWatchLocation";

const randomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const AuthPage = ({ user, location }) => {
  const { token, logout } = useUser();
  const navigation = useNavigation();
  const theme = useTheme();
  const [journey, setJourney] = useState();
  const [checkpoint, setCheckpoint] = useState();
  const { connected, lastLocation } = useWatchLocation();

  useEffect(() => {
    API.journeys
      .all()
      .then((journeys) => {
        const journey = randomElement(journeys);
        setJourney(journey);

        return API.journeys.checkpoints(journey.id);
      })
      .then((checkpoints) => {
        setCheckpoint(randomElement(checkpoints));
      });
  }, []);

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

          {checkpoint && (
            <Button
              mode="outlined"
              onPress={() =>
                navigation.navigate("Reward", {
                  checkpoint,
                })
              }
            >
              {checkpoint.title}
            </Button>
          )}

          {checkpoint && (
            <Button
              mode="outlined"
              onPress={() =>
                navigation.navigate("CheckpointMap", {
                  checkpoint,
                })
              }
            >
              map {checkpoint.title}
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
      </SafeAreaView>
    </View>
  );
};

export default withAuth(withLocation(AuthPage));
