import React, { useContext, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import CategoryTabSection from "../components/sections/CategoryTabSection";
import FeaturedItemsSection from "../components/sections/FeaturedItemsSection";
import HorizontalDealsSection from "../components/sections/HorizontalDealsSection";
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";

const HomeScreens = ({userStatus}) => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(userStatus);

  console.log(userData);

  const onRefresh = () => {
    setRefreshing(true);

    // Fetch new data here and update your state

    // After fetching the data, set refreshing to false
    setRefreshing(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        {
          backgroundColor: activeColors.primary,
        },
        styles.Container,
      ]}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ flexGrow: 1 }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          ></View>

          <CategoryTabSection />
        </ScrollView>
        <FeaturedItemsSection />
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              paddingHorizontal: 10,
            }}
          ></View>

          <HorizontalDealsSection />
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  sectionTitle: {
    marginTop: 25,
    marginLeft: 25,
    marginBottom: 25,
  },
});

export default HomeScreens;
