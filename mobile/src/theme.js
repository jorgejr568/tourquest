import { MD3LightTheme } from "react-native-paper";

const THEME = {
  ...MD3LightTheme,
  roundness: 2,
  colors: {
    ...MD3LightTheme.colors,
    primary: "rgb(60, 168, 151)",
    background: "#fff",
    elevation: {
      level1: "rgba(60, 168, 151, 0.01)", // Green color, alpha 0.05
      level2: "rgba(60, 168, 151, 0.08)", // Green color, alpha 0.08
      level3: "rgba(60, 168, 151, 0.11)", // Green color, alpha 0.11
      level4: "rgba(60, 168, 151, 0.12)", // Green color, alpha 0.12
      level5: "rgba(60, 168, 151, 0.14)", // Green color, alpha 0.14
    },
    surfaceVariant: "rgba(60, 168, 151, 0.1)", // Green color, alpha 0.05
  },
};

export default THEME;
