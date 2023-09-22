import { forwardRef } from "react";
import LottieView from "lottie-react-native";

function MedalAnimation(props, ref) {
  return (
    <LottieView
      ref={ref}
      source={require("../../animations/Medal.json")}
      autoPlay={false}
      loop={false}
      style={{ width: 200, height: 200 }}
      {...props}
    />
  );
}

export default forwardRef(MedalAnimation);
