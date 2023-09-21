import LottieView from "lottie-react-native";
import { forwardRef } from "react";

function ManWalkingAnimation(props, ref) {
  return (
    <LottieView
      source={require("../../animations/ManWalkingBackground.json")}
      style={{ width: 250, height: 250 }}
      loop
      autoPlay={true}
      speed={0.5}
      ref={ref}
      {...props}
    />
  );
}

export default forwardRef(ManWalkingAnimation);
