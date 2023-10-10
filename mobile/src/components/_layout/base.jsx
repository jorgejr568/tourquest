import { SafeAreaView, View } from "react-native";
import Navbar from "../organisms/Navbar";
import { useTheme } from "react-native-paper";

export const BaseLayout = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {children}
    </View>
  );
};

const Content = ({ children, centered = false }) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.elevation.level1,
        ...(centered && {
          justifyContent: "center",
          alignItems: "center",
        }),
      }}
    >
      {children}
    </SafeAreaView>
  );
};

BaseLayout.Content = Content;
BaseLayout.Navbar = Navbar;
