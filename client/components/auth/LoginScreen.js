import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Headline,
  TextInput,
  Button,
  useTheme,
  Subheading,
  Snackbar,
} from "react-native-paper";
import { useDispatch } from "react-redux";

import { login } from "../../redux/actions/auth";
import API from "../../api";

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { colors, fonts } = useTheme();

  const loginHandler = async () => {
    try {
      const response = await API.post("auth/login", {
        email,
        password,
      });

      await dispatch(login(response.data.token, response.data.userId));
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setShowError(true);

      // clear fields
      setEmail("");
      setPassword("");
      Keyboard.dismiss();
    }
  };

  return (
    <SafeAreaView
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <View>
        <Headline
          style={[
            styles.title,
            { color: colors.primary, fontFamily: fonts.regular.fontFamily },
          ]}
        >
          Food Capture
        </Headline>
        <Subheading
          style={[
            styles.subheading,
            {
              color: colors.primary,
              fontFamily: fonts.regular.fontFamily,
            },
          ]}
        >
          Reducing Food Wastage Through Community Distribution
        </Subheading>
      </View>
      <View style={styles.inputs}>
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
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.actions}>
        <Button onPress={loginHandler} mode="contained">
          Login
        </Button>
        <Button
          onPress={() => {
            props.navigation.navigate("Signup");
          }}
        >
          Create Account
        </Button>
      </View>
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

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 40,
    textAlign: "center",
    paddingTop: 15,
  },
  subheading: {
    fontWeight: "normal",
    fontSize: 18,
    textAlign: "center",
    paddingTop: 5,
  },
  screen: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around",
    // backgroundColor: "#CCD7D2",
  },
  input: { marginVertical: 5, backgroundColor: "#ffffff" },
});
