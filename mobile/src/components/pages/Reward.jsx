import { useCallback, useEffect, useMemo, useRef } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import MedalAnimation from "../atoms/MedalAnimation";
import withAuth from "../../middlewares/auth.middleware";
import Navbar from "../organisms/Navbar";
import firstName from "../../utils/firstName";

function Reward({ route, user, navigation }) {
  const medalRef = useRef();
  const theme = useTheme();
  const styles = useMemo(() =>
    StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.elevation.level1,
      },
      safeContainer: {
        flex: 1,
      },
      contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
      },
      title: {
        textAlign: "center",
        marginBottom: 48,
        lineHeight: 36,
      },
      titleBold: {
        fontWeight: "bold",
        color: theme.colors.primary,
      },
      medalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      button: {
        marginBottom: 12,
      },
    })
  );

  const title = useMemo(() => {
    if (route.params?.journey) {
      return (
        <Text variant="headlineSmall" style={styles.title}>
          Você concluiu a Jornada{" "}
          <Text variant="headlineMedium" style={styles.titleBold}>
            {route.params.journey.title}
          </Text>
        </Text>
      );
    }

    if (route.params?.checkpoint) {
      return (
        <Text variant="headlineSmall" style={styles.title}>
          Você concluiu o Checkpoint{"  "}
          <Text variant="headlineMedium" style={styles.titleBold}>
            {route.params.checkpoint.title}
          </Text>
        </Text>
      );
    }

    navigation.goBack();
    return null;
  }, [route.params, theme]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const resetAnimation = useCallback(() => {
    setTimeout(() => {
      if (!medalRef.current) return;

      medalRef.current.reset();
      medalRef.current.play();
    }, 1500);
  }, [medalRef.current]);

  return (
    <View style={styles.container}>
      <Navbar title={`Parabéns ${firstName(user.name)}`} />

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.medalContainer}>
            {title}
            <MedalAnimation ref={medalRef} onAnimationFinish={resetAnimation} />
          </View>

          <Button mode="contained" style={styles.button} onPress={handleBack}>
            Voltar
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default withAuth(Reward);
