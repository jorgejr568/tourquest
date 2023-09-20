import Router from "./src/router";
import { UserProvider } from "./src/context/user.context";
import { PaperProvider } from "react-native-paper";
import { LogBox } from "react-native";
import THEME from "./src/theme";

LogBox.ignoreLogs([
  "Warning: Cannot update a component (`ForwardRef(BaseNavigationContainer)`)...",
]);
export default function App() {
  return (
    <PaperProvider theme={THEME}>
      <UserProvider>
        <Router />
      </UserProvider>
    </PaperProvider>
  );
}
