import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Headline, TextInput, Button } from "react-native-paper";
import { useDispatch } from "react-redux";

import { signup } from "../../redux/actions/auth";

const SignupScreen = (props) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupHandler = async () => {
    try {
      await dispatch(signup(email, password));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.title}>
        <Headline>Signup</Headline>
      </View>
      <View style={styles.inputs}>
        <TextInput
          style={styles.input}
          label="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
          }}
        />
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
        />
        <TextInput
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
        <Button onPress={signupHandler}>Create Account</Button>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20, justifyContent: "space-around" },
  input: { marginVertical: 5 },
});
