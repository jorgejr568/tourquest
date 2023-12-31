import { Keyboard, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useCallback, useMemo, useState } from "react";
import DismissKeyboardView from "../organisms/DismissKeyboardView";
import API from "../../API";
import useUser from "../../hooks/useUser";
import { useNavigation } from "@react-navigation/native";
import withGuest from "../../middlewares/guest.middleware";
import useErrors from "../../hooks/useErrors";
import { z } from "zod";
import { BaseLayout } from "../_layout/base";

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

  const handleSubmit = useCallback(() => {
    setLoading(true);
    Keyboard.dismiss();
    API.user
      .login(form.email, form.password)
      .then(({ token }) => {
        setToken(token);
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
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
      <BaseLayout>
        <BaseLayout.Navbar />
        <BaseLayout.Content centered>
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
        </BaseLayout.Content>
      </BaseLayout>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
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
});

export default withGuest(Login);
