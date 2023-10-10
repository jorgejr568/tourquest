import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/pages/Home";
import Auth from "./components/pages/Auth";
import { StatusBar } from "expo-status-bar";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Reward from "./components/pages/Reward";
import CheckpointMap from "./components/pages/CheckpointMap";
import CheckpointList from "./components/pages/CheckpointList";

const Stack = createNativeStackNavigator();

export default function Router() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Reward" component={Reward} />
        <Stack.Screen name="CheckpointMap" component={CheckpointMap} />
        <Stack.Screen name="CheckpointList" component={CheckpointList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
