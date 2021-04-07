import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Headline,
  TextInput,
  Button,
  useTheme,
  Snackbar,
} from "react-native-paper";
import { useDispatch } from "react-redux";

import API from "../../api";
import { login } from "../../redux/actions/auth";

const SignupScreen = (props) => {
  const dispatch = useDispatch();

  const { colors, fonts } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signupHandler = async () => {
    try {
      // reject if passwords do not match
      if (password !== confirmPassword) {
        // display error
        setErrorMessage("Passwords do not match");
        setShowError(true);
        setPassword("");
        setConfirmPassword("");
        Keyboard.dismiss();
        return;
      }

      const response = await API.post("auth/signup", {
        name,
        email,
        password,
      });

      await dispatch(login(response.data.token, response.data.userId));
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
        setShowError(true);
        // clear fields
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        Keyboard.dismiss();
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={[
          styles.screen,
          { backgroundColor: colors.background },
        ]}
      >
        <View>
          <Headline
            style={[
              styles.title,
              { color: colors.primary, fontFamily: fonts.regular.fontFamily },
            ]}
          >
            Signup
          </Headline>
        </View>
        <View style={styles.inputs}>
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Name"
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            autoCapitalize={"none"}
          />
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry
          />
          <TextInput
            mode="outlined"
            style={styles.input}
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            secureTextEntry
          />
        </View>
        <View style={styles.actions}>
          <Button onPress={signupHandler} mode="contained">
            Create Account
          </Button>
        </View>
      </ScrollView>
      <Snackbar
        visible={showError}
        onDismiss={() => {
          setShowError(false);
        }}
        duration={3000}
        style={{ backgroundColor: "red" }}
      >
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    paddingTop: 15,
  },
  screen: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
    // backgroundColor: "#CCD7D2"
  },
  input: { marginVertical: 5, backgroundColor: "#ffffff" },
});
