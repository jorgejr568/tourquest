import { useCallback, useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Navbar from "../organisms/Navbar";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import withGuest from "../../middlewares/guest.middleware";
import DismissKeyboardView from "../organisms/DismissKeyboardView";
import { useNavigation } from "@react-navigation/native";
import API from "../../API";
import useUser from "../../hooks/useUser";
import useErrors from "../../hooks/useErrors";
import { z } from "zod";
import SuccessBadge from "../molecules/SuccessBadge";
import { BaseLayout } from "../_layout/base";

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

function RegisterPage({ navigation }) {
  const errorsContext = useErrors();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const canSubmit = useMemo(() => {
    const { success } = schema.safeParse(form);
    return success;
  }, [form]);

  const { setToken } = useUser();
  const [waitToken, setWaitToken] = useState();

  const handleAlreadyHaveAccount = useCallback(() => {
    navigation.navigate("Login");
  }, []);

  const handleRegister = useCallback(() => {
    setLoading(true);
    errorsContext.clear();
    API.user
      .register(form.email, form.password, form.name)
      .then(({ token }) => {
        setSuccess(true);
        setWaitToken(token);
      })
      .catch((e) => {
        if (e.response.status === 422) {
          const { message: errors } = e.response.data;
          if (errors?.email) {
            errorsContext.pushError("E-mail inválido ou já cadastrado");
          }

          if (errors?.password) {
            errorsContext.pushError(
              "A senha deve conter no mínimo 8 caracteres"
            );
          }

          if (errors?.name) {
            errorsContext.pushError("Nome inválido");
          }

          return;
        }

        if (e.response.status === 409) {
          errorsContext.pushError("E-mail já cadastrado");
          return;
        }

        errorsContext.pushError("Erro ao cadastrar");
      })
      .finally(() => setLoading(false));
  }, [form]);

  const handleAnimationFinished = useCallback(() => {
    setToken(waitToken);
    navigation.navigate("Home");
  }, [waitToken]);

  return (
    <BaseLayout>
      <BaseLayout.Navbar title="Crie sua conta" />

      <DismissKeyboardView>
        <BaseLayout.Content centered>
          {success ? (
            <SuccessBadge
              title="Que bom que você está aqui!"
              onFinished={handleAnimationFinished}
            />
          ) : (
            <>
              <Text variant="headlineSmall" style={styles.heading}>
                Cadastro TourQuest
              </Text>

              <View style={styles.form}>
                <TextInput
                  label="Nome"
                  value={form.name}
                  onChangeText={(name) =>
                    setForm((form) => ({ ...form, name }))
                  }
                  placeholder="Digite seu nome"
                />

                <TextInput
                  label="Email"
                  value={form.email}
                  onChangeText={(email) =>
                    setForm((form) => ({ ...form, email }))
                  }
                  placeholder="Digite seu email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <TextInput
                  label="Senha"
                  value={form.password}
                  onChangeText={(password) =>
                    setForm((form) => ({ ...form, password }))
                  }
                  secureTextEntry
                  placeholder="********"
                  autoCapitalize="none"
                />

                <View style={styles.alreadyHaveAccountContainer}>
                  <Button
                    style={styles.alreadyHaveAccountButton}
                    onPress={handleAlreadyHaveAccount}
                  >
                    Já tem uma conta?
                  </Button>
                </View>

                <Button
                  mode="contained"
                  onPress={handleRegister}
                  loading={loading}
                  disabled={!canSubmit}
                >
                  Cadastrar
                </Button>
              </View>
            </>
          )}
        </BaseLayout.Content>
      </DismissKeyboardView>
    </BaseLayout>
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
    gap: 16,
    marginTop: 42,
  },

  alreadyHaveAccountContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default withGuest(RegisterPage);
