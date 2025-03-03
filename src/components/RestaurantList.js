import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import RestaurantItem from "./RestaurantItem";
//import restaurants from "../data/restaurants";
import { getAllRestaurants } from "../api/restaurants";

const RestaurantList = ({ filterByName, filterByCategory }) => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [restaurantsbe, setRestaurantsBe] = useState([]);
  useEffect(() => {
    const fetchRestaurants = async () => {
      const res = await getAllRestaurants();
      console.log("Fetched restaurants:", res);
      setRestaurantsBe(res);
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    let newFilteredRestaurants = restaurantsbe
      .filter((restaurant) => {
        const nameMatch = restaurant?.name
          ?.toLowerCase()
          ?.includes(filterByName.trim().toLowerCase());

        const categoryMatch =
          !filterByCategory || restaurant?.category?.name === filterByCategory;

        return filterByName.length > 0 ? nameMatch : nameMatch && categoryMatch;
      })
      .map((restaurant) => (
        <RestaurantItem
          key={restaurant?._id}
          restaurantName={restaurant?.name}
          restaurantImage={restaurant?.image}
          restaurantRating={restaurant?.rating}
          restaurantDeliveryTime={restaurant?.deliveryTime}
          restaurantId={restaurant?._id}
        />
      ));

    setFilteredRestaurants(newFilteredRestaurants);
  }, [filterByName, filterByCategory, restaurantsbe]);
  // Errors 1:
  if (filterByName.length > 0 && filteredRestaurants.length === 0) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
          We couldn't find "
          <Text style={{ fontWeight: "bold", color: "orange" }}>
            {filterByName}
          </Text>
          "
        </Text>
        <Text style={{ color: "#7E8D85", fontSize: 16, textAlign: "center" }}>
          Check the spelling or try another search.
        </Text>
      </View>
    );
  }
  // Errors 2:
  if (filterByCategory && filteredRestaurants.length === 0) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <Text style={{ fontSize: 18, color: "white", textAlign: "center" }}>
          No restaurants available in "
          <Text style={{ fontWeight: "bold", color: "orange" }}>
            {filterByCategory}
          </Text>
          " category yet.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Text
        style={{
          color: "orange",
          fontSize: 20,
          fontWeight: "bold",
          paddingBottom: 10,
        }}
      >
        Restaurants
      </Text>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false}
      >
        {filteredRestaurants}
      </ScrollView>
    </View>
  );
};

export default RestaurantList;
