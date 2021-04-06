import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  Button,
  ActivityIndicator,
  Avatar,
  useTheme,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import API from "../../api";
import { logout } from "../../redux/actions/auth";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(
    "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
  );
  const [loading, setLoading] = useState(false);

  const { colors, fonts } = useTheme();

  // get user token
  const token = useSelector((state) => state.auth.token);

  // fetch user details on load
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const response = await API.get("user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setName(response.data.user.name);
        setEmail(response.data.user.email);

        if (
          response.data.user.profilePic &&
          response.data.user.profilePic.url
        ) {
          setProfilePic(response.data.user.profilePic.url);
        } else {
          // default pic
          setProfilePic(
            "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
          );
        }
      }

      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  // select photo
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required.");
      return;
    }

    // select from library
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (pickerResult.cancelled) {
      return;
    }

    let localUri = pickerResult.uri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // change image
    const prevPic = profilePic; // store prev pic in case update failed
    setProfilePic(localUri);

    // update
    try {
      // prepare form data
      let formData = new FormData();
      formData.append("image", { uri: localUri, name: filename, type });

      // upload image to server
      const response = await API.post("user/image", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
    } catch (e) {
      // ERROR - if failed, revert
      setProfilePic(prevPic);
      console.log("Profile pic update failed");
    }
  };

  // loading screen if loading
  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <Avatar.Image
        size={125}
        style={{ alignSelf: "center", marginBottom: 20 }}
        source={{ uri: profilePic }}
        onTouchEnd={pickImage}
      />
      <Text style={styles.field}>Name: {name}</Text>
      <Text style={styles.field}>Email: {email}</Text>
      <Button
        style={styles.button}
        icon="logout"
        onPress={() => {
          dispatch(logout());
        }}
      >
        Logout
      </Button>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20 },
  loadingScreen: { flex: 1, justifyContent: "center" },
  field: {
    marginTop: 15,
    marginBottom: 15,
    fontSize: 17,
    color: "#243665",
    textAlign: "center",
  },
  button: { marginTop: 15 },
});
