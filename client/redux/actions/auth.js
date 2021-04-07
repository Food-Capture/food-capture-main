import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN, LOGOUT, SIGNUP } from "./types";

import API from "../../api";

export const signup = (name, email, password) => {
  return async (dispatch) => {
    try {
      const response = await API.post("auth/signup", {
        name,
        email,
        password,
      });

      if (response.status != 201) throw new Error("Signup failed");

      // store user data in async storage
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({
          token: response.data.token,
          userId: response.data.userId,
        })
      );

      // dispatch login to store
      dispatch({
        type: SIGNUP,
        payload: response.data,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const login = (token, userId) => {
  return async (dispatch) => {
    try {
      // store user data in async storage
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({
          token,
          userId,
        })
      );

      // store login data in store
      dispatch({
        type: LOGIN,
        payload: { token, userId },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const autoLogin = (token, userId) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN,
      payload: { token, userId },
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("@user");
    dispatch({ type: LOGOUT });
  };
};
