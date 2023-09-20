import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/pages/Home";
import Auth from "./components/pages/Auth";
import { StatusBar } from "expo-status-bar";
import Navbar from "./components/organisms/Navbar";
import Login from "./components/pages/Login";

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
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
