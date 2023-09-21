import LottieView from "lottie-react-native";
import { forwardRef } from "react";
import { StyleSheet } from "react-native";

function SuccessAnimation(props, ref) {
  return (
    <LottieView
      source={require("../../animations/RegisterCompleted.json")}
      style={styles.animation}
      loop={false}
      ref={ref}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
});

export default forwardRef(SuccessAnimation);
