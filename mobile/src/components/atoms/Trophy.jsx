import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { Text } from "react-native-paper";

export function TrophyAnimation() {
  const ref = useRef();

  const onAnimationFinish = () => {
    ref.current.play(100, 400);
  };

  useEffect(() => {
    setTimeout(() => {
      ref.current.play();
    }, 100);
  }, []);
  return (
    <>
      <LottieView
        source={require("../../animations/Trophy.json")}
        autoPlay={false}
        loop={false}
        ref={ref}
        onAnimationFinish={onAnimationFinish}
        speed={4}
      />
      <Text>{ref.current && ref.current.duration}</Text>
    </>
  );
}
