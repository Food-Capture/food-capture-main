import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FeedScreen from "../../components/feed/FeedScreen";

const FeedStack = createStackNavigator();

const FeedNavigator = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
    </FeedStack.Navigator>
  );
};

export default FeedNavigator;
