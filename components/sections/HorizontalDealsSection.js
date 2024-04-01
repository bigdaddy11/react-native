import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";
import PostCard from "../cards/PostCard";

const images = [
  require("../../images/sample_image_1.jpg"),
  require("../../images/sample_image_2.jpg"),
  require("../../images/sample_image_3.jpg"),
  require("../../images/sample_image_4.jpg"),
  require("../../images/sample_image_2.jpg"),
  require("../../images/sample_image_3.jpg"),
  require("../../images/sample_image_4.jpg"),
];

const HorizontalDealsSection = ({ selectedCategory }) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          paddingHorizontal: 10,
          marginTop: 20,
          marginBottom: 15,
          color: activeColors.text,
        }}
      >
        Today's Deals
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {images.map((imageSource, index) => (
          <PostCard
            key={index}
            imageSource={imageSource}
            title={`Title - ${index}`}
            description={`This is a sample description for the ${index} card component.`}
          />
        ))}
        
      </ScrollView>
    </View>
  );
};

export default HorizontalDealsSection;
