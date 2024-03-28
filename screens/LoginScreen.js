import React, { useContext, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import axios from "axios";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

const LoginScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  
  const [active, setActive] = useState(false);
  const [idValue, onChangeID] = useState('');
  const [pwValue, onChangePW] = useState('');
  const [userStatus, setUserStatus] = useState();

  const [requestBody, setRequestBody] = useState();
  let activeColors = colors[theme.mode];
  
  //const { isLoading, error, sendRequest: fetchDatas } = RestAPICall();
  //const [datas, setDatas] = useState([]);
  const handleRestCallPress = () => {
    ActiveIsPassedLogin();
    setRequestBody({
      userNo: idValue,
      userNm: pwValue
    });
    axios.get('http://localhost:8080/login/'+idValue,setRequestBody)
      .then((response) => {
        setUserStatus(response.data);
        console.log("userStatus : " + userStatus);
        navigation.navigate("Footer",userStatus);
      })
      .catch((error) =>{
        window.alert("계정정보가 없거나, 비밀번호를 잘못 입력하셨습니다.");
      })
  }
  
  const ActiveIsPassedLogin = () => {
    return idValue.includes('@') && pwValue.length >= 5
      ? setActive(true)
      : setActive(false);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: activeColors.primary,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../images/login.png")}
            style={{
              height: 200,
              width: 300,
              transform: [{ rotate: "-5deg" }],
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: activeColors.tint,
            marginBottom: 10,
          }}
        >
        
        </Text>

        <InputField
          selectionColor={activeColors.tint}
          label={"Email ID"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={idValue}
          onChangeText={text => onChangeID(text)}
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
          value={pwValue}
          onChangeText={text => onChangePW(text)}
        />

        <CustomButton
          label={"Login"}
          className={active ? 'activeLoginBtn' : 'loginBtn'}
          disabled={idValue === '' || pwValue === '' ? true : false}
          url="http://localhost:8080/member"
          //param= {pwValue => searchParams(pwValue)}
          onPress={() => {
            handleRestCallPress();
            navigation.navigate("Footer");
          }}
        />

        <Text
          style={{
            textAlign: "center",
            color: activeColors.tint,
            marginBottom: 10,
          }}
        >
          간편 로그인

        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <Image
              source={require("../images/kakao.jpg")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <Image
              source={require("../images/naver.jpg")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <Image
              source={require("../images/google.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <Image
              source={require("../images/facebook.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: activeColors.secondary,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 20,
            }}
          >
            <Image
              source={require("../images/apple.png")}
              style={{ height: 20, width: 20 }}
            />
          </TouchableOpacity> */}
        </View>

        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ color: activeColors.tint }}>New to the app? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: activeColors.accent, fontWeight: "700" }}>
              {" "}
              Register
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
