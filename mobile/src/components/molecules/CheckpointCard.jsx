import { useNavigation } from "@react-navigation/native";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export default function CheckpointCard({ checkpoint, journeyId, completed }) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (completed) {
      Alert.alert("Objetivo concluído", "Você já concluiu esse objetivo");
      return;
    }

    navigation.navigate("CheckpointMap", {
      checkpoint,
      journeyId,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Image style={styles.img} source={{ uri: checkpoint.image }} />
      <View style={styles.containerText}>
        <Text style={styles.title}>{checkpoint.title}</Text>
        <Text style={styles.description}>{checkpoint.description}</Text>
      </View>

      {completed && (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>Objetivo concluído</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#fff",
    borderRadius: 6,
    overflow: "hidden",
    position: "relative",
  },

  containerText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 10,
    flex: 1,
    gap: 8,

    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    fontWeight: "regular",
  },
  img: {
    padding: 0,
    height: 300,
    width: "100%",
  },
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
