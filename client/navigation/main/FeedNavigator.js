import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

import FeedScreen from "../../components/feed/FeedScreen";
import PostDetailsScreen from "../../components/feed/PostDetailsScreen";

const FeedStack = createStackNavigator();


const FeedNavigator = () => {

  return (
      <FeedStack.Navigator>
        <FeedStack.Screen name="Feed" component={FeedScreen} 
        options={{
          title: 'Feed',
          headerStyle: {
            backgroundColor: '#243665',
          },
          headerTitleStyle: {
            color: "#CCD7D2"
          },
        }}
        />
        <FeedStack.Screen name="Details" component={PostDetailsScreen}
        options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#243665',
          },
          headerTitleStyle: {
            color: "#CCD7D2"
          },
        }}
        />
      </FeedStack.Navigator>
  );
};

export default FeedNavigator;

