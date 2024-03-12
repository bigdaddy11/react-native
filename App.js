import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import { storeData, getData } from "./config/asyncStorage";
import * as SplashScreen from "expo-splash-screen";
import RegisterScreen from "./screens/RegisterScreen";

//Theme context is used to update the
//theme of the app. It will be used in
//all the screens of the app.
import { ThemeContext } from "./context/ThemeContext";

SplashScreen.preventAutoHideAsync();
const Stack = createStackNavigator();

const App = () => {
  const [theme, setTheme] = useState({ mode: Appearance.getColorScheme() });
  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === "dark" ? "light" : "dark";
      newTheme = { mode };
    }
    setTheme(newTheme);
    storeData("homeTheme", newTheme);
  };

  const fetchStoredTheme = async () => {
    try {
      const themeData = await getData("homeTheme");
      if (themeData) {
        updateTheme(themeData);
      }
    } catch ({ message }) {
      alert(message);
    } finally {
      //hiding the splash screen after 1 second
      await setTimeout(() => SplashScreen.hideAsync(), 1000);
    }
  };
  useEffect(() => {
    fetchStoredTheme();

    //if the theme of the device changes then
    //updateTheme function will be called using
    //Appearance.addChangeListener method
    Appearance.addChangeListener(({ colorScheme }) => {
      updateTheme();
      setTheme({ mode: colorScheme });
    });
  }, []);

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Register"
            component={RegisterScreen}
          />
          <Stack.Screen
            name="Footer"
            component={Footer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
