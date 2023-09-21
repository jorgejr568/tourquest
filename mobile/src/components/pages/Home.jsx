import { SafeAreaView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "../organisms/Navbar";
import { Button } from "react-native-paper";
import withGuest from "../../middlewares/guest.middleware";

function Home() {
  const navigate = useNavigation();
  return (
    <View>
      <Navbar />
      <SafeAreaView>
        <Button mode="contained" onPress={() => navigate.navigate("Login")}>
          Login
        </Button>
      </SafeAreaView>
    </View>
  );
}

export default withGuest(Home);
