import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";

export default function Navbar() {
  const navigation = useNavigation();
  const route = useRoute();

  const hasBack = navigation.canGoBack() && route.name !== "Home";
  const title = route.name || "title";
  const theme = useTheme();

  const styles = useMemo(() =>
    StyleSheet.create(
      {
        header: {
          backgroundColor: theme.colors.elevation.level3,
        },
      },
      [theme]
    )
  );

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }

    navigation.navigate("Home");
  });

  return (
    <Appbar.Header style={styles.header}>
      {hasBack && <Appbar.BackAction onPress={goBack} />}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
