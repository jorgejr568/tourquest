import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import CompletedBadge from "../atoms/CompletedBadge";

export default function JourneyCard({ journey, completed }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Journey", {
      journey,
    });
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handlePress}
    >
      <Image style={styles.img} source={{ uri: journey.image }} />
      <View style={styles.containerText}>
        <Text style={styles.title}>{journey.title}</Text>
        <Text style={styles.description}>{journey.shortDescription}</Text>
      </View>

      {completed && <CompletedBadge />}
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
