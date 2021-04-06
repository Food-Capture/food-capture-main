import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Button,
  Checkbox,
  Snackbar,
  TextInput,
  useTheme,
} from "react-native-paper";
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

  const { colors, fonts } = useTheme();

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
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.inputs}>
        <TextInput
          label="Title"
          mode="outlined"
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
                <Text style={styles.instruction}>Upload Image</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <TextInput
          mode="outlined"
          label="Location"
          style={styles.textInput}
          value={location}
          onChangeText={(text) => {
            setLocation(text);
          }}
        />
        <TextInput
          mode="outlined"
          label="Allergens"
          style={styles.textInput}
          value={allergens}
          onChangeText={(text) => {
            setAllergens(text);
          }}
        />
        <View style={styles.check}>
          <Text style={styles.field}>Contains Meat</Text>
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
              <Text style={styles.field}>Collect By (Date)</Text>
              <Text style={styles.info}>{collectBy.toDateString()}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              showMode("time");
            }}
          >
            <View style={styles.selector}>
              <Text style={styles.field}>Collect By (Time)</Text>
              <Text style={styles.info}>{collectBy.toLocaleTimeString()}</Text>
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
          mode="outlined"
          label="Description"
          style={styles.description}
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
  textInput: { marginBottom: 10, backgroundColor: "#ffffff" },
  description: { height: 100, marginBottom: 10, marginTop: 10 },
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
  instruction: {
    color: "#243665",
  },
  field: {
    color: "#243665",
    fontWeight: "bold",
  },
  info: {
    color: "#1F79FB",
  },
});
