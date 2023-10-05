import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

export default function CheckpointCard({ checkpoint }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("CheckpointMap", {
      checkpoint,
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 20,
  },
  containerText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 10,
    flex: 1,
    gap: 8,
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
    height: 100,
    width: 100,
    borderRadius: 6,
  },
});
