import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

import MainTabNavigator from "./MainTabNavigator";
import AuthNavigator from "./AuthNavigator";

const EntryNavigator = () => {
  const userId = useSelector((state) => state.auth.userId);

  return <>{userId ? <MainTabNavigator /> : <AuthNavigator />}</>;
};

export default EntryNavigator;
