import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import FeedNavigator from "./main/FeedNavigator";
import ProfileNavigator from "./main/ProfileNavigator";

const MainTab = createMaterialBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Feed" component={FeedNavigator} />
      <MainTab.Screen name="Profile" component={ProfileNavigator} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({});
