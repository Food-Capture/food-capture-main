import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../../components/profile/ProfileScreen";

const ProfileStack = createStackNavigator();

const ProfileNavigator = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen}
      options={{
        title: 'Profile',
        headerStyle: {
          backgroundColor: '#243665',
        },
        headerTitleStyle: {
          color: "#CCD7D2"
        },
      }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
