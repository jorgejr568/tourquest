import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function DismissKeyboardView({ children }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
}
