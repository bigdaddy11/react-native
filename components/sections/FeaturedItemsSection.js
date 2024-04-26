import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import axios from "axios";
import FeaturedCardComponent from "../cards/FeaturedCardComponent";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";
import PostWrite from "../content/PostWrite";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const images = [
  require("../../images/sample_image_1.jpg"),
  require("../../images/sample_image_2.jpg"),
  require("../../images/sample_image_3.jpg"),
  require("../../images/sample_image_4.jpg"),
];

//top: Dimensions.get('window').height - insets.bottom - 100
const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const FeaturedItemsSection = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const [post,setPost] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('http://localhost:8080/post')
      .then((response) => {
        setPost(response.data);
        //handleCategoryPress(response.data,0);
        
      })
      .catch((error) =>{  
        
      })
    },[]);

    const item = (Object.values(post)).map((item, index) => (
      <><View
        key={index}
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
        }} /><FeaturedCardComponent
          key={index}
          imageSource={images[index]}
          title={item.postTitle}
          description={item.postContent} /></>
    ));

  return (
    <View>
      {item}
      <TouchableOpacity>
        <View style={[
          styles.container
        ]}>
          <Text style={{color: "#FFFFFF"}} onPress={() => {
            navigation.navigate("PostWrite");
          }}>+
          </Text>
        </View>
      </TouchableOpacity>
      
    </View>
    //  <View>
    //    {/* <Text
    //     style={{
    //       fontSize: 24,
    //       fontWeight: "bold",
    //       paddingHorizontal: 10,
    //       marginTop: 20,
    //       marginBottom: 15,
    //       color: activeColors.text,
    //     }}
    //   >
    //     Featured Items
    //   </Text> */}
      //  <View style={{ flexDirection: "column", paddingHorizontal: 10 }}>
      //    {[...Array(2)].map((_, rowIndex) => (
      //     <View
      //       key={rowIndex}
      //       style={{
      //         flexDirection: "column",
      //         justifyContent: "space-between",
      //       }}
      //     >
    //         {[...Array(2)].map((_, colIndex) => (
    //           <FeaturedCardComponent
    //             key={colIndex}
    //             imageSource={images[rowIndex * 2 + colIndex]}
    //             title={`Featured Item ${rowIndex * 2 + colIndex + 1}`}
    //             description="This is a sample description for the featured item."
    //           />
    //         ))}
    //       </View>
    //     ))}
    //   </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00A5FF",
    //borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: 100 ,
    marginHorizontal: 10,
    marginVertical: 5,
    width: "40px",
    height: "40px",
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    zIndex: 9999,
    top: -350,
    right: 0,
  },
});

export default FeaturedItemsSection;
