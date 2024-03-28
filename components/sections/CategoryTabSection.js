import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { colors } from "../../config/theme";
import { ThemeContext } from "../../context/ThemeContext";
import CategoryCard from "../cards/CategoryTabCard";
import CategoryContent from "../content/CategoryContent";

const CategoryTabSection = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const categoriesScrollViewRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [category,setCategory] = useState({});

    useEffect(() => {
    axios.get('http://localhost:8080/category')
      .then((response) => {
        setCategory(response.data);
        // /setCategory(0);
      })
      .catch((error) =>{
        
      })
    },[]);

  //setCategory(category);

  const item = (Object.values(category)).map((item, index) => (
    <CategoryCard
        //key={index}
        key={item.categoryCode}
        title={item.categoryTitle}
        onPress={() => handleCategoryPress(item, index)}
        isActive={item === selectedCategory}
    />
  ));
  

  const handleCategoryPress = (category, index) => {
    setSelectedCategory(category);
    
    // Scroll the category to the center
    const screenWidth = Dimensions.get("window").width;
    const categoryWidth = 150; // Adjust this value based on your CategoryCard width
    const scrollToX = index * categoryWidth - (screenWidth - categoryWidth) / 2;

    categoriesScrollViewRef.current.scrollTo({
      x: scrollToX,
      animated: true,
    });
  };

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={categoriesScrollViewRef}
      >
        {/* {["Category 1", "Category 2", "Category 3", "Category 4"].map(
          (category, index) => (
            <CategoryCard
              key={index}
              title={category}
              onPress={() => handleCategoryPress(category, index)}
              isActive={category === selectedCategory}
            />
          )
        )} */}
        {item}
      </ScrollView>

      <CategoryContent selectedCategory={selectedCategory} />
    </View>
  );
};

export default CategoryTabSection;
