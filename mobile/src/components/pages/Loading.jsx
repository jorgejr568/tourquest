import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function LoadingPage() {
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.elevation.level1,
        },
      }),
    [theme]
  );
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}
