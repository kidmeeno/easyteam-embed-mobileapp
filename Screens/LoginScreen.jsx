import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { handleLogin } from "../services/authService";
import useAppState from "../state/hooks/useAppState";

const LoginScreen = () => {
  const { dispatch } = useAppState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={() => handleLogin({ email, password, setLoading, dispatch })}
      >
        <Text style={styles.buttonText}>
          {loading && "Loading"}
          {!loading && "Login"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={loading}
        style={styles.signUp}
        onPress={() => navigation.navigate("SignUpScreen")}
      >
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff3479",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signUp: {
    marginTop: 16,
    alignItems: "center",
  },
  signUpText: {
    color: "#ff3479",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
