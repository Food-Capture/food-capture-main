import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

import store from "./redux/store";
import EntryNavigator from "./navigation/EntryNavigator";

const fontConfig = {
  web: {
    regular: {
      fontFamily: "Roboto",
      fontWeight: "normal",
    },
  },
  ios: {
    regular: {
      fontFamily: "Roboto",
      fontWeight: "normal",
    },
  },
  android: {
    regular: {
      fontFamily: "Roboto",
      fontWeight: "normal",
    },
  },
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#243665",
    accent: "#8BD8BD",
    background: "#eefbfb",
  },
  fonts: configureFonts(fontConfig),
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <EntryNavigator />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
