import React, { useEffect, useRef } from 'react'; 
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import CategoryItem from './CategoryItem';
import Icon from "react-native-vector-icons/MaterialIcons";
import categories from '../data/categories';

const CategoryList = ({filterByName}) => {
    const allCategories = categories
    .filter((category)=>{
        return category.categoryName.toLowerCase().includes(filterByName.trim().toLowerCase());
    })
    .map((category)=>{
        return (
            <CategoryItem 
                categoryName={category.categoryName} 
                categoryImage={category.categoryImage}
            />
        );
    });

  const fadeAnim = useRef(new Animated.Value(0.5)).current; // Initial opacity

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
      <Text style={{ color: "#3C493F", fontSize: 20, fontWeight: "bold" }}>
        Categories
      </Text>

      <View style={{ position: "relative" }}>
        {/* ScrollView */}
        <ScrollView
          horizontal={true}
          style={{ gap: 10 }}
          contentContainerStyle={{
            gap: 5,
            paddingBottom: 10,
          }}
        >
          {allCategories}
        </ScrollView>

        <Animated.View
          style={{
            position: "absolute",
            right: 5,
            top: "39%",
            transform: [{ translateY: -10 }],
            backgroundColor: "rgba(126, 141, 133, 0.17)",
            padding: 5,
            borderRadius: 20,
            opacity: fadeAnim, 
          }}
        >
          <Icon name="arrow-forward-ios" size={20} color="#A2E3C4" />
        </Animated.View>
      </View>
    </View>
  );
};

export default CategoryList;



const styles = StyleSheet.create({})