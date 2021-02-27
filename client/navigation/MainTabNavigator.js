import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import FeedNavigator from "./main/FeedNavigator";

const MainTab = createMaterialBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Feed" component={FeedNavigator} />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({});
