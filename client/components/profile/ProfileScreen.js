import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch } from "react-redux";

import { logout } from "../../redux/actions/auth";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <Button
        icon="logout"
        onPress={() => {
          dispatch(logout());
        }}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 20 },
});
