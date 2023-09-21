import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Appbar, useTheme } from "react-native-paper";
import useNavbar from "../../hooks/useNavbar";
import { StatusBar } from "expo-status-bar";

export default function Navbar(props) {
  const navigation = useNavigation();
  const context = useNavbar();
  const route = useRoute();

  const hasBack = navigation.canGoBack() && route.name !== "Home";
  const title =
    props.title || context.title(route.name) || route.name || "title";
  const theme = useTheme();

  const styles = useMemo(() =>
    StyleSheet.create(
      {
        header: {
          backgroundColor: theme.colors.primary,
        },
      },
      [theme],
    ),
  );

  const goBack = useCallback(() => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }

    navigation.navigate("Home");
  });

  useEffect(() => {
    context.setTitle("");
  }, [route.name]);

  return (
    <>
      <StatusBar style="light" />

      <Appbar.Header style={styles.header}>
        {hasBack && <Appbar.BackAction onPress={goBack} color="white" />}
        <Appbar.Content title={title} titleStyle={{ color: "white" }} />
      </Appbar.Header>
    </>
  );
}
