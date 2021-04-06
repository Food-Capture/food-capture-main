import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Headline, TextInput, Button, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";

import { signup } from "../../redux/actions/auth";

const SignupScreen = (props) => {
  const dispatch = useDispatch();

  const { colors, fonts } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupHandler = async () => {
    try {
      await dispatch(signup(name, email, password));
    } catch (error) {
      console.log(error);
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
