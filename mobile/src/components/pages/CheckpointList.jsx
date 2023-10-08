import { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";
import CheckpointCard from "../molecules/CheckpointCard";
import API from "../../API";
import withAuth from "../../middlewares/auth.middleware";
import Navbar from "../organisms/Navbar";

function CheckpointList({ route, navigation }) {
  const { journey } = route.params;
  const [checkpoints, setCheckpoints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.journeys
      .checkpoints(journey.id)
      .then(setCheckpoints)
      .catch((e) => {
        console.error("Error on get checkpoints", e);
        navigation.goBack();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Navbar title={`${journey.title}`} />
      <SafeAreaView style={styles.safeContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!loading && (
          <View style={styles.listContainer}>
            <FlatList
              data={checkpoints}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.checkpointItem}>
                  <CheckpointCard checkpoint={item} journeyId={journey.id} />
                </View>
              )}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  safeContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkpointItem: {
    marginBottom: 16,
  },
});

export default withAuth(CheckpointList);
