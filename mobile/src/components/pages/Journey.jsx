import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { BaseLayout } from "../_layout/base";
import useWatchLocation from "../../hooks/useWatchLocation";
import CompletedBadge from "../atoms/CompletedBadge";
import useUser from "../../hooks/useUser";

export default function Journey({ route, navigation }) {
  const { journey } = route.params;
  const { isJourneyCompleted } = useUser();
  useWatchLocation({
    journeyId: journey.id,
  });

  return (
    <BaseLayout>
      <BaseLayout.Navbar title={`${journey.title}`} />

      <BaseLayout.Content>
        <View style={styles.container}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{ uri: journey.image }} />
            {isJourneyCompleted(journey) && <CompletedBadge />}
          </View>

          <Text style={styles.title}>{journey.title}</Text>

          <View style={styles.descriptionContainer}>
            {journey.description.map((description, index) => (
              <Text style={styles.description} key={index}>
                {description}
              </Text>
            ))}
          </View>

          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate("CheckpointList", {
                journey,
              });
            }}
            style={styles.button}
          >
            Começar a jornada
          </Button>
        </View>
      </BaseLayout.Content>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 300,
    height: 300,
  },
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  descriptionContainer: {
    marginVertical: 14,
    rowGap: 8,
  },
  description: {
    fontSize: 15,
    fontWeight: "regular",
  },
  button: {
    width: "100%",
    marginVertical: 12,
  },
  imgContainer: {
    position: "relative",
    borderRadius: 6,
    overflow: "hidden",
    width: "auto",
    marginVertical: 12,
  },
});
