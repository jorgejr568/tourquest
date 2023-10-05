import { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { Text } from "react-native-paper";
import CheckpointCard from "../molecules/CheckpointCard";
import API from "../../API";
import withAuth from "../../middlewares/auth.middleware";
import Navbar from "../organisms/Navbar";

function CheckpointList({ route, navigation }) {
  const { journey } = route.params;
  const [checkpoints, setCheckpoints] = useState([]);

  useEffect(() => {
    API.journeys
      .checkpoints(journey.id)
      .then(setCheckpoints)
      .catch((e) => {
        console.error("Error on get checkpoints", e);
        navigation.goBack();
      });
  }, []);

  return (
    <View style={styles.container}>
      <Navbar title={`${journey.title}`} />
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.listContainer}>
          <FlatList
            data={checkpoints}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.checkpointItem}>
                <CheckpointCard checkpoint={item} />
              </View>
            )}
          />
        </View>
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
  checkpointItem: {
    marginBottom: 16,
  },
});

export default withAuth(CheckpointList);
