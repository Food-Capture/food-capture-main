import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Button, Checkbox, Snackbar, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

import API from "../../api";

const CreateScreen = (props) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [containsMeat, setContainsMeat] = useState(false);
  const [allergens, setAllergens] = useState("");
  const [collectBy, setCollectBy] = useState(new Date());
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const [created, setCreated] = useState(false);

  // get user token
  const token = useSelector((state) => state.auth.token);

  // date time picker
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || collectBy;
    setShow(Platform.OS === "ios");
    setCollectBy(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const createPost = async () => {
    // prepare form data
    let formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("containsMeat", containsMeat);
    formData.append("allergens", allergens);
    formData.append("collectBy", collectBy.toUTCString());
    formData.append("description", description);
    if (image && image.uri) {
      formData.append("image", image);
    }

    try {
      const response = await API.post("post", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      // TODO: Handle ERROR
      console.log(e);
      return;
    }

    // SUCCESS - show snackbar + clear fields
    setCreated(true);
    setTitle("");
    setLocation("");
    setContainsMeat(false);
    setAllergens("");
    setDescription("");
    setImage(null);
  };

  // select photo
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required.");
      return;
    }

    // select from library
    const pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.cancelled) {
      return;
    }

    let localUri = pickerResult.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // change image
    setImage({ uri: localUri, name: filename, type });
  };

  // set date to 2 hours from now
  useEffect(() => {
    const current = new Date();
    current.setHours(current.getHours() + 2);
    setCollectBy(current);
  }, []);

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.inputs}>
        <TextInput
          label="Title"
          style={styles.textInput}
          value={title}
          onChangeText={(text) => {
            setTitle(text);
          }}
        />
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image
                source={{
                  uri: image.uri,
                }}
                style={{ height: 300 }}
              />
            ) : (
              <View style={styles.imageSelect}>
                <Text>Upload Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
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
        <View>
          <TouchableOpacity
            onPress={() => {
              showMode("date");
            }}
          >
            <View style={styles.selector}>
              <Text>Collect By (Date)</Text>
              <Text>{collectBy.toDateString()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              showMode("time");
            }}
          >
            <View style={styles.selector}>
              <Text>Collect By (Time)</Text>
              <Text>{collectBy.toLocaleTimeString()}</Text>
            </View>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={collectBy}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
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
        <Button onPress={createPost} mode="contained">
          Create Post
        </Button>
        <View style={{ height: 50 } /*To fix bottom tabs blocking */}></View>
      </ScrollView>

      <Snackbar
        visible={created}
        onDismiss={() => {
          setCreated(false);
        }}
        duration={3000}
      >
        Post Created
      </Snackbar>
    </View>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  inputs: { padding: 20 },
  textInput: { marginBottom: 10 },
  check: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  imageSelect: {
    justifyContent: "center",
    alignItems: "center",
    height: 300,
  },
});
