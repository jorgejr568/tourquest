import { createContext, useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Snackbar, Text, useTheme } from "react-native-paper";

export const ErrorsContext = createContext({
  errors: [],
  setErrors: (errors) => {},
  pushError: (error) => {},
  clear: () => {},
});

export const ErrorsProvider = ({ children }) => {
  const theme = useTheme();
  const [errors, setErrors] = useState([]);

  const styles = StyleSheet.create({
    snackbar: {
      backgroundColor: theme.colors.error,

      justifyContent: "center",
      paddingHorizontal: 48,
    },
    container: {
      flexDirection: "column",
      gap: 8,
    },
    text: {
      color: theme.colors.surface,
    },
  });

  const handlePushError = useCallback((error) => {
    setErrors((prev) => [...prev, error]);
  }, []);

  return (
    <ErrorsContext.Provider
      value={{
        errors,
        setErrors,
        pushError: handlePushError,
        clear: () => setErrors([]),
      }}
    >
      <>
        {children}

        {errors.length > 0 && (
          <Snackbar
            style={[styles.snackbar]}
            visible={true}
            onDismiss={() => setErrors([])}
            duration={5000}
          >
            <View style={styles.container}>
              {errors.map((error, index) => (
                <Text key={index} style={styles.text}>
                  {error}
                </Text>
              ))}
            </View>
          </Snackbar>
        )}
      </>
    </ErrorsContext.Provider>
  );
};
