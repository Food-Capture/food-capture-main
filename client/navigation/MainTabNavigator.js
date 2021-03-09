import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import FeedNavigator from "./main/FeedNavigator";
import ProfileNavigator from "./main/ProfileNavigator";
import PostNavigator from "./main/PostNavigator";

const MainTab = createMaterialBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="rss" color={color} size={26} />
          ),
        }}
      />
      <MainTab.Screen
        name="Post"
        component={PostNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({});
