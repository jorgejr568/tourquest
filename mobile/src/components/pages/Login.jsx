import { Keyboard, SafeAreaView, StyleSheet, View } from "react-native";
import Navbar from "../organisms/Navbar";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useCallback, useMemo, useState } from "react";
import DismissKeyboardView from "../organisms/DismissKeyboardView";
import API from "../../API";
import useUser from "../../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import withGuest from "../../middlewares/guest.middleware";
import useErrors from "../../hooks/useErrors";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function Login() {
  const { setToken } = useUser();
  const navigation = useNavigation();
  const errorsContext = useErrors();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const canSubmit = useMemo(() => {
    return schema.safeParse(form).success;
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

          flexDirection: "column",
          gap: 24,
          marginTop: 42,
        },

        createAccountHelperContainer: {
          flexDirection: "row",
          justifyContent: "center",
        },
      }),
    [],
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
        errorsContext.setErrors(["Email ou senha incorretos"]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [form]);

  const handleCreateAccount = useCallback(() => {
    navigation.navigate("Register");
  }, []);

  return (
    <DismissKeyboardView>
      <View style={styles.container}>
        <Navbar />
        <SafeAreaView style={styles.safeContainer}>
          <Text variant="headlineSmall">Entrar na TourQuest</Text>

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
              autoCapitalize="none"
            />

            <View style={styles.createAccountHelperContainer}>
              <Button
                style={styles.createAccountHelperButton}
                onPress={handleCreateAccount}
              >
                Ainda não tem uma conta
              </Button>
            </View>

            <Button
              mode="contained"
              loading={loading}
              disabled={!canSubmit}
              onPress={handleSubmit}
            >
              Entrar
            </Button>
          </View>
        </SafeAreaView>
      </View>
    </DismissKeyboardView>
  );
}

export default withGuest(Login);
