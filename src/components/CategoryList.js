import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import CategoryItem from "./CategoryItem";
import Icon from "react-native-vector-icons/MaterialIcons";
// import categories from "../data/categories";
import { getAllCategories } from "../api/restaurants";

const CategoryList = ({
  filterByName,
  selectedCategory,
  setSelectedCategory,
  setSearch,
}) => {
  const [categoriesbe, setCategoriesBe] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to scroll the ScrollView to the right
  const [scrollX, setScrollX] = useState(0);
  const scrollViewRef = useRef(null);
  const handleArrowPress = () => {
    if (scrollViewRef.current) {
      const newOffset = scrollX + 200; // Increase offset by 100 pixels
      console.log("Scrolling from:", scrollX, "to:", newOffset); // Debug
      scrollViewRef.current.scrollTo({
        x: newOffset,
        animated: true,
      });
    }
  };
  const handleScroll = (event) => {
    const newScrollX = event.nativeEvent.contentOffset.x;
    setScrollX(newScrollX);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategories();
      console.log("Fetched categories:", res);
      setCategoriesBe(res);
    };
    setLoading(false);
    fetchCategories();
  }, []);

  const allCategories = categoriesbe
    .filter((category) => {
      return category.name
        .toLowerCase()
        .includes(filterByName.trim().toLowerCase());
    })
    .map((category) => {
      return (
        <CategoryItem
          key={category._id}
          categoryName={category.name}
          categoryImage={category.image}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSearch={setSearch}
        />
      );
    });

  const fadeAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1, // Fully visible
          duration: 1000, // 1 second
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3, // Less visible
          duration: 1000, // 1 second
          useNativeDriver: true,
        }),
      ])
    );

    animation.start(); // Explicitly start the animation

    return () => animation.stop(); // Cleanup on unmount
  }, []);

  if (allCategories.length === 0) {
    return null;
  }

  return (
    <View style={{ textAlign: "left", marginTop: -10 }}>
      <Text style={{ color: "orange", fontSize: 20, fontWeight: "bold" }}>
        Categories
      </Text>

      <View style={{ position: "relative" }}>
        {/* ScrollView */}
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          style={{ gap: 10 }}
          contentContainerStyle={{
            gap: 5,
            paddingBottom: 10,
          }}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {allCategories}
        </ScrollView>
        <TouchableOpacity
          onPress={handleArrowPress}
          style={{
            position: "absolute",
            right: 5,
            top: "37%",
            transform: [{ translateY: -10 }],
            backgroundColor: "rgba(255, 166, 0, 0.16)",
            padding: 5,
            borderRadius: 20,
            opacity: fadeAnim,
          }}
        >
          <Animated.View>
            <Icon name="arrow-forward-ios" size={20} color="orange" />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryList;

const styles = StyleSheet.create({});
