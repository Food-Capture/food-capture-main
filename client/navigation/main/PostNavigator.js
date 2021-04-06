import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import CreateScreen from "../../components/create/CreateScreen";

const PostStack = createStackNavigator();

const PostNavigator = () => {
  return (
    <PostStack.Navigator>
      <PostStack.Screen name="Create" component={CreateScreen} 
      options={{
        title: 'Create',
        headerStyle: {
          backgroundColor: '#243665',
        },
        headerTitleStyle: {
          color: "#CCD7D2"
        },
      }}
      />
    </PostStack.Navigator>
  );
};

export default PostNavigator;
