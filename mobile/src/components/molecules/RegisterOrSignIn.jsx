import { StyleSheet } from "react-native";
import { FAB, useTheme } from "react-native-paper";
import useUser from "../../hooks/useUser";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function RegisterOrSignIn({ hide = false }) {
  const { navigate } = useNavigation();
  const [open, setOpen] = useState(false);
  const { user, loading, logout } = useUser();
  const theme = useTheme();

  const styles = StyleSheet.create({
    fab: {
      backgroundColor: theme.colors.primary,
      borderRadius: 9999,
    },
  });

  if (loading || hide) return null;

  return (
    <FAB.Group
      fabStyle={styles.fab}
      open={open}
      visible
      icon={open ? "window-close" : "account"}
      color="#fff"
      actions={
        (user && [
          {
            icon: "logout",
            label: "Sair",
            onPress: () => {
              logout();
              setOpen(false);
            },
          },
        ]) || [
          {
            icon: "account-star",
            label: "Crie sua conta",
            onPress: () => navigate("Register"),
          },
          {
            icon: "email",
            label: "Já tenho uma conta",
            onPress: () => navigate("Login"),
          },
        ]
      }
      onStateChange={({ open }) => setOpen(open)}
    />
  );
}
