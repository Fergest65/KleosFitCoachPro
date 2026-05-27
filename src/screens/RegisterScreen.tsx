import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { supabase } from "../lib/supabase";
import { colors } from "../theme/colors";

type Props = {
  onGoToLogin: () => void;
};

export default function RegisterScreen({ onGoToLogin }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (!email || !password) {
      Alert.alert("Errore", "Inserisci email e password.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert("Registrazione fallita", error.message);
      return;
    }

    Alert.alert("Account creato", "Controlla la tua email per confermare l’account.");
    onGoToLogin();
  }

  return (
    <LinearGradient colors={["#050505", "#111111"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.inner}
      >
        <Text style={styles.logo}>KLEOS</Text>
        <Text style={styles.title}>Crea il tuo profilo</Text>
        <Text style={styles.subtitle}>
          Entra in KleosFitCoachPro e costruisci il tuo percorso fitness premium.
        </Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={colors.gray}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor={colors.gray}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>CREA ACCOUNT</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onGoToLogin}>
            <Text style={styles.link}>
              Hai già un account? Accedi
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: {
    flex: 1,
    justifyContent: "center",
    padding: 28,
  },
  logo: {
    color: colors.lime,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 18,
  },
  title: {
    color: colors.white,
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 12,
  },
  subtitle: {
    color: colors.gray,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 34,
  },
  form: {
    gap: 14,
  },
  input: {
    backgroundColor: colors.card,
    color: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 18,
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.lime,
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#000",
    fontWeight: "900",
    fontSize: 16,
    letterSpacing: 1,
  },
  link: {
    color: colors.gray,
    textAlign: "center",
    marginTop: 18,
    fontSize: 14,
  },
});