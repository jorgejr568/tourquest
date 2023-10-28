import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function CompletedBadge() {
  return (
    <View style={styles.completedContainer}>
      <Text style={styles.completedText}>Objetivo concluído</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  completedContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    padding: 4,
    backgroundColor: "#f59e0b",
    justifyContent: "center",
    alignItems: "center",
  },

  completedText: {
    color: "#fefefe",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});
