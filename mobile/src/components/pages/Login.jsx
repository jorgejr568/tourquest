import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Navbar from "../organisms/Navbar";
import {
  Text,
  useTheme,
  TextInput,
  Button,
  Snackbar,
} from "react-native-paper";
import { useCallback, useMemo, useState } from "react";
import DismissKeyboardView from "../organisms/DismissKeyboardView";
import API from "../../API";
import useUser from "../../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import withGuest from "../../middlewares/guest.middleware";

function Login() {
  const { setToken } = useUser();
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const canSubmit = useMemo(() => {
    return form.email && form.password;
  }, [form]);

  const theme = useTheme();
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        safeContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.elevation.level1,
        },
        heading: {},

        form: {
          paddingHorizontal: 24,
          paddingBottom: 92,
          width: "100%",
          maxWidth: 380,
          display: "flex",
          flexDirection: "column",
          gap: 24,
          marginTop: 42,
        },
        snackbar: {
          backgroundColor: theme.colors.error,
          display: "flex",
          justifyContent: "center",
        },
      }),
    []
  );

  const handleSubmit = useCallback(() => {
    setLoading(true);
    Keyboard.dismiss();
    API.user
      .login(form.email, form.password)
      .then(({ token }) => {
        setToken(token);
        navigation.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        });
      })
      .catch(() => {
        setError("Email ou senha incorretos");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form]);
  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Navbar />
        <SafeAreaView style={styles.safeContainer}>
          <Text variant="titleLarge">Entrar na TourQuest</Text>

          <View style={styles.form}>
            <TextInput
              label="Email"
              placeholder="Digite seu email"
              keyboardType="email-address"
              style={styles.emailInput}
              value={form.email}
              onChangeText={(email) =>
                setForm((form) => ({ ...form, email: email.toLowerCase() }))
              }
              autoCapitalize="none"
            />

            <TextInput
              label="Senha"
              placeholder="********"
              style={styles.emailInput}
              secureTextEntry
              value={form.password}
              onChangeText={(password) =>
                setForm((form) => ({ ...form, password }))
              }
            />

            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8}>
              <Button mode="contained" loading={loading} disabled={!canSubmit}>
                Entrar
              </Button>
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {error && (
          <Snackbar
            visible={error}
            onDismiss={() => setError(null)}
            style={styles.snackbar}
          >
            {error}
          </Snackbar>
        )}
      </View>
    </DismissKeyboardView>
  );
}

export default withGuest(Login);
