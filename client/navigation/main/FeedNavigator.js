import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FeedScreen from "../../components/feed/FeedScreen";
import PostDetailsScreen from "../../components/feed/PostDetailsScreen";

const FeedStack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
      <FeedStack.Screen name="Details" component={PostDetailsScreen} />
    </FeedStack.Navigator>
  );
};

export default FeedNavigator;
