import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Button, Checkbox, TextInput } from "react-native-paper";

const CreateScreen = (props) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [containsMeat, setContainsMeat] = useState(false);
  const [allergens, setAllergens] = useState("");
  const [description, setDescription] = useState("");

  const createPost = () => {};

  return (
    <ScrollView style={styles.screen}>
      <TextInput
        label="Title"
        style={styles.textInput}
        value={title}
        onChangeText={(text) => {
          setTitle(text);
        }}
      />
      <TextInput
        label="Location"
        style={styles.textInput}
        value={location}
        onChangeText={(text) => {
          setLocation(text);
        }}
      />
      <TextInput
        label="Allergens"
        style={styles.textInput}
        value={allergens}
        onChangeText={(text) => {
          setAllergens(text);
        }}
      />
      <View style={styles.check}>
        <Text>Contains Meat</Text>
        <Checkbox
          status={containsMeat ? "checked" : "unchecked"}
          onPress={() => {
            setContainsMeat(!containsMeat);
          }}
        />
      </View>
      <TextInput
        label="Description"
        style={styles.textInput}
        multiline
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <Button onPress={createPost}>Create Post</Button>
    </ScrollView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20 },
  textInput: { marginBottom: 10 },
  check: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});
