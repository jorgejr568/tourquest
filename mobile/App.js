import Router from "./src/router";
import { UserProvider } from "./src/context/user.context";
import { PaperProvider } from "react-native-paper";
import { LogBox } from "react-native";
import THEME from "./src/theme";
import { NavbarProvider } from "./src/context/navbar.context";
import { ErrorsProvider } from "./src/context/errors.context";

LogBox.ignoreLogs([
  "Warning: Cannot update a component (`ForwardRef(BaseNavigationContainer)`) while rendering a different component (`ForwardRef`). To locate the bad setState() call inside `ForwardRef`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",
]);

export default function App() {
  return (
    <PaperProvider theme={THEME}>
      <ErrorsProvider>
        <NavbarProvider>
          <UserProvider>
            <Router />
          </UserProvider>
        </NavbarProvider>
      </ErrorsProvider>
    </PaperProvider>
  );
}
