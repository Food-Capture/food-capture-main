import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Headline, TextInput, Button } from "react-native-paper";
import { useDispatch } from "react-redux";

import { login } from "../../redux/actions/auth";

const LoginScreen = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      await dispatch(login(email, password));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.title}>
        <Headline>Food Capture</Headline>
      </View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
          autoCapitalize={"none"}
        />
        <TextInput
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
        <Button onPress={loginHandler}>Login</Button>
        <Button
          onPress={() => {
            props.navigation.navigate("Signup");
          }}
        >
          Create Account
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20, justifyContent: "space-around" },
  input: { marginVertical: 5 },
});
