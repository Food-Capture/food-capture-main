import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { autoLogin } from "../redux/actions/auth";
import MainTabNavigator from "./MainTabNavigator";
import AuthNavigator from "./AuthNavigator";

const EntryNavigator = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // check if user information is stored
    const tryLogin = async () => {
      setIsLoading(true);

      const userData = await AsyncStorage.getItem("@user");

      if (userData) {
        const userDataJSON = JSON.parse(userData);
        dispatch(autoLogin(userDataJSON.token, userDataJSON.userId));
      }

      setIsLoading(false);
    };

    tryLogin();
  }, [userId]);

  if (isLoading) {
    // loading screen
  }

  return <>{userId ? <MainTabNavigator /> : <AuthNavigator />}</>;
};

export default EntryNavigator;
