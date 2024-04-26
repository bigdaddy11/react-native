import React, { useContext, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, View, Dimensions} from "react-native";
import CategoryTabSection from "../components/sections/CategoryTabSection";
import HorizontalDealsSection from "../components/sections/HorizontalDealsSection";
import FeaturedItemsSection from "../components/sections/FeaturedItemsSection"
import { colors } from "../config/theme";
import { ThemeContext } from "../context/ThemeContext";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeTestScreen = () => {
  const { theme } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  let activeColors = colors[theme.mode];

  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState();

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
              // marginTop: 10,
              paddingHorizontal: 10,
            }}
          ></View>
          <CategoryTabSection />
        </ScrollView>
        { <FeaturedItemsSection /> }
        <ScrollView>
          <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            paddingHorizontal: 10,
            flexGrow: 7,
          }}
          ></View>
          {/* <View style={ {
          position: 'absolute',
          top: Dimensions.get('window').height - insets.bottom - 100
          }}>
            <Button title="+"></Button>
          </View> */}
          { <HorizontalDealsSection /> }
          
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: "column"
  },
  sectionTitle: {
    marginTop: 25,
    marginLeft: 25,
    marginBottom: 25,
  },
});

export default HomeTestScreen;
