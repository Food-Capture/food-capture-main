import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../../components/profile/ProfileScreen";

const ProfileStack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
