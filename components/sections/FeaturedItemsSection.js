import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import axios from "axios";
import FeaturedCardComponent from "../cards/FeaturedCardComponent";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";

const images = [
  require("../../images/sample_image_1.jpg"),
  require("../../images/sample_image_2.jpg"),
  require("../../images/sample_image_3.jpg"),
  require("../../images/sample_image_4.jpg"),
];

const FeaturedItemsSection = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  const [post,setPost] = useState({});

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

export default FeaturedItemsSection;
