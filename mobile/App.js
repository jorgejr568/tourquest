import Router from "./src/router";
import { UserProvider } from "./src/context/user.context";
import { PaperProvider } from "react-native-paper";
import { LogBox } from "react-native";
import THEME from "./src/theme";
import { ErrorsProvider } from "./src/context/errors.context";
import { LocationProvider } from "./src/context/location.context";

LogBox.ignoreLogs([
  "Warning: Cannot update a component (`ForwardRef(BaseNavigationContainer)`) while rendering a different component (`ForwardRef`). To locate the bad setState() call inside `ForwardRef`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",
  "Sending `Expo.locationChanged` with no listeners registered.",
]);

export default function App() {
  return (
    <PaperProvider theme={THEME}>
      <ErrorsProvider>
        <UserProvider>
          <LocationProvider>
            <Router />
          </LocationProvider>
        </UserProvider>
      </ErrorsProvider>
    </PaperProvider>
  );
}
