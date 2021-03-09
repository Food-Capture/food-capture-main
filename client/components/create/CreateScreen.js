import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";

const CreateScreen = (props) => {
  return (
    <ScrollView style={styles.screen}>
      <TextInput label="Title" style={styles.textInput} />
      <TextInput label="Location" style={styles.textInput} />
      <TextInput label="Description" style={styles.textInput} multiline />
    </ScrollView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20 },
  textInput: { marginBottom: 10 },
});
