import { View, SafeAreaView } from "react-native";
import withAuth from "../../middlewares/auth.middleware";
import Navbar from "../organisms/Navbar";
import { Button, Text, useTheme } from "react-native-paper";
import useUser from "../../hooks/useUser";

const AuthPage = ({ user }) => {
  const { token, logout } = useUser();
  const theme = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Navbar />

      <SafeAreaView
        style={{
          backgroundColor: theme.colors.elevation.level1,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          paddingHorizontal: 80,
        }}
      >
        <Text variant="displayLarge">Auth</Text>
        <Text>{JSON.stringify({ ...user, token }, null, 2)}</Text>

        <Button onPress={logout}>Logout</Button>
      </SafeAreaView>
    </View>
  );
};

export default withAuth(AuthPage);
