import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const CategoryItem = ({
  categoryName,
  categoryImage,
  selectedCategory,
  setSelectedCategory,
  setSearch,
}) => {
  const isSelected = selectedCategory === categoryName;
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedCategory(categoryName);
        setSearch("");
      }}
    >
      <View
        style={{
          width: 83,
          gap: 5,
          marginTop: 15,
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.11)",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
            padding: 10,
            width: 80,
            height: 70,
          }}
        >
          <Image
            style={{
              width: 50,
              height: 40,
              borderRadius: 5,
            }}
            source={{ uri: categoryImage }}
          />
        </View>
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>{categoryName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
