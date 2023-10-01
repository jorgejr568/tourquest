import { useTheme } from "react-native-paper";

export default function withTheme(Component) {
  return function WithTheme(props) {
    const theme = useTheme();
    return <Component {...props} theme={theme} />;
  };
}
