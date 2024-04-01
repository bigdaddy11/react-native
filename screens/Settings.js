import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  Appearance,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import SettingsItem from "../components/settings/SettingsItem";
import StyledText from "../components/texts/StyledText";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

const SettingsScreen = ({ navigation, route }) => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const { userProp, setUserProp } = useState();
  let activeColors = colors[theme.mode];
  //console.log("Setting : " + route.params.userId);
  //here we set the state of the switch to the current theme
  //theme.mode is the current theme which we get from the context
  const [isDarkTheme, setIsDarkTheme] = useState(theme.mode === "dark");

  //here we toggle the theme and update the state of the switch
  const toggleTheme = () => {
    updateTheme();
    setIsDarkTheme((prev) => !prev);
  };

  useEffect(() => {
    //here we listen for the color scheme change and update the state of the switch
    //this is necessary so that the switch automatically updates
    //when the user changes the theme from the settings
    Appearance.addChangeListener(({ colorScheme }) => {
      colorScheme === "dark" ? setIsDarkTheme(true) : setIsDarkTheme(false);
    });

    // axios.get('http://localhost:8080/login/prop/'+route.params.userId)
    // .then((response) => {
    //   console.log("Setting login prop" + response.data[0]);
    //   setUserProp(response.data);
    // })
    // .catch((error) =>{
    //   //window.alert("계정정보가 없거나, 비밀번호를 잘못 입력하셨습니다.");
    // })
  }, []);

  // const item = (Object.values(userProp)).map((item, index) => (
  //   <SettingsItem label={item.userNm}>
  //       <StyledText>{item.userNm}</StyledText>
  //   </SettingsItem>
  //       //key={index}
        

  // ));

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      style={[{ backgroundColor: activeColors.primary }, styles.Container]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <StyledText style={{ color: activeColors.accent }} bold>
        User
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label="이름">
          <StyledText>Maro</StyledText>
        </SettingsItem>
        <SettingsItem label="마지막로그인">
          <StyledText>02/12/2022</StyledText>
        </SettingsItem>
      </View>

      <StyledText style={{ color: activeColors.accent }} bold>
        Theme Switch
      </StyledText>

      <View style={styles.section}>
        <SettingsItem label="Dark Mode">
          <Switch
            value={isDarkTheme}
            onValueChange={toggleTheme}
            thumbColor={isDarkTheme ? "#fff" : activeColors.tertiary}
            ios_backgroundColor={activeColors.primary}
            trackColor={{
              false: activeColors.primary,
              true: activeColors.accent,
            }}
          ></Switch>
        </SettingsItem>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <SettingsItem>
            <Ionicons name="log-out-outline" size={24} color="red" />
            <StyledText style={{ color: "red" }}> Logout</StyledText>
          </SettingsItem>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 25,
  },
  section: {
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    marginBottom: 25,
  },
  logout: {
    bottom: 0,
    position: "absolute",
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 25,
    alignSelf: "center",
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
