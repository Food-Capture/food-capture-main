import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import API from "../../api";
import { logout } from "../../redux/actions/auth";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // get user token
  const token = useSelector((state) => state.auth.token);

  // fetch user details on load
  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const response = await API.get("user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data);

      if (response.status === 200) {
        setName(response.data.user.name);
        setEmail(response.data.user.email);
      }

      setLoading(false);
    };

    fetchUserDetails();
  }, []);

  // loading screen if loading
  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
      <Button
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
});
