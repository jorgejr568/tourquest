import { FlatList, StyleSheet, View } from "react-native";
import CheckpointCard from "../molecules/CheckpointCard";
import { BaseLayout } from "../_layout/base";
import useUser from "../../hooks/useUser";
import RegisterOrSignIn from "../molecules/RegisterOrSignIn";
import withLocation from "../../middlewares/location.middleware";
import useWatchLocation from "../../hooks/useWatchLocation";

function CheckpointList({ route }) {
  const { userCompletedCheckpoint } = useUser();
  const { journey } = route.params;
  const checkpoints = journey.checkpoints;

  useWatchLocation({
    journeyId: journey.id,
  });

  return (
    <BaseLayout>
      <BaseLayout.Navbar title={`${journey.title}`} />
      <BaseLayout.Content>
        <View style={styles.listContainer}>
          <FlatList
            data={checkpoints}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.checkpointItem}>
                <CheckpointCard
                  checkpoint={item}
                  journeyId={journey.id}
                  completed={userCompletedCheckpoint(item.id)}
                />
              </View>
            )}
          />
        </View>

        <RegisterOrSignIn />
      </BaseLayout.Content>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkpointItem: {
    marginVertical: 20,
    marginHorizontal: 24,
  },
});

export default withLocation(CheckpointList);
