import { SafeAreaView, StyleSheet, View } from "react-native";
import Navbar from "../organisms/Navbar";
import ManWalkingAnimation from "../atoms/ManWalkingAnimation";
import { useMemo } from "react";
import { Button, useTheme } from "react-native-paper";

export default function LocationRequestPage({ requestLocation }) {
  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        safeContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.elevation.level1,
        },
        innerContainer: {
          gap: 48,
          paddingBottom: 40,
        },
      }),
    [theme],
  );
  return (
    <View style={styles.container}>
      <Navbar title="Precisamos de uma ajudinha" />
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.innerContainer}>
          <ManWalkingAnimation />

          <Button mode="contained" onPress={requestLocation}>
            Permitir localização
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
