import { useCallback, useEffect, useMemo, useRef } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import MedalAnimation from "../atoms/MedalAnimation";
import withAuth from "../../middlewares/auth.middleware";
import Navbar from "../organisms/Navbar";
import firstName from "../../utils/firstName";
import withLocation from "../../middlewares/location.middleware";
import useErrors from "../../hooks/useErrors";
import API from "../../API";
import useUser from "../../hooks/useUser";

function Reward({ route, user, navigation, location }) {
  const { pushUserCompletedCheckpoint } = useUser();
  const medalRef = useRef();
  const errors = useErrors();
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
    }),
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
    navigation.pop(2);
  }, []);

  const resetAnimation = useCallback((isCancelled) => {
    if (isCancelled) return;

    setTimeout(() => {
      if (medalRef.current) {
        medalRef.current.play(30, 100);
      }
    }, 2000);
  }, []);

  useEffect(() => {
    if (!medalRef.current) return;

    setTimeout(() => {
      medalRef.current.play();
    }, 100);
  }, [medalRef.current]);

  useEffect(() => {
    errors.clear();
    if (route.params?.checkpoint) {
      API.user
        .markCheckpoint(route.params.checkpoint.id, location)
        .then(() => {
          pushUserCompletedCheckpoint(route.params.checkpoint.id);
        })
        .catch((error) => {
          errors.pushError(
            "Não foi possível marcar o checkpoint como concluído.",
          );
          navigation.goBack();
        });
    }
  }, [route.params]);

  const animationComponent = useMemo(() => {
    return <MedalAnimation ref={medalRef} onAnimationFinish={resetAnimation} />;
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Navbar title={`Parabéns ${firstName(user.name)}`} />

      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.contentContainer}>
          <View style={styles.medalContainer}>
            {title}
            {animationComponent}
          </View>

          <Button mode="contained" style={styles.button} onPress={handleBack}>
            Voltar
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default withAuth(withLocation(Reward));
