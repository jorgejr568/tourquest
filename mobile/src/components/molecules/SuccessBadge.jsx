import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import { Text } from "react-native-paper";
import { useCallback, useEffect, useRef } from "react";
import SuccessAnimation from "../atoms/SuccessAnimation";

export default function SuccessBadge({ title, onFinished }) {
  const ref = useRef();
  const timeoutRef = useRef();
  const handleAnimationFinish = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      onFinished && onFinished();
    }, 1500);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [onFinished]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (!ref.current) return;

    let timeout = setTimeout(() => {
      ref.current?.reset();
      ref.current?.play();
    }, 100);
    return () => clearTimeout(timeout);
  }, [ref.current]);
  return (
    <View style={styles.container}>
      <SuccessAnimation />
      {title &&
        (typeof title === "string" ? (
          <Text variant="headlineSmall">{title}</Text>
        ) : (
          title
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
});
