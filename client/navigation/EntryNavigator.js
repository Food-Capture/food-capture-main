import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native-paper";

import { autoLogin } from "../redux/actions/auth";
import MainTabNavigator from "./MainTabNavigator";
import AuthNavigator from "./AuthNavigator";
import { View } from "react-native";

const EntryNavigator = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // check if user information is stored
    const tryLogin = async () => {
      setIsLoading(true);

      const userData = await AsyncStorage.getItem("@user");

      if (userData) {
        const userDataJSON = JSON.parse(userData);
        dispatch(autoLogin(userDataJSON.token, userDataJSON.userId));
      }

      setIsLoading(false);
    };

    tryLogin();

    return () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) {
    // loading screen
    return (
      <View style={styles.screen}>
        <ActivityIndicator />
      </View>
    );
  }

  return <>{userId ? <MainTabNavigator /> : <AuthNavigator />}</>;
};

export default EntryNavigator;

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: "center" },
});
