import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import RestaurantItem from './RestaurantItem';
import restaurants from '../data/restaurants';

const RestaurantList = ({ filterByName }) => {
  const allRestaurant = restaurants
    .filter((restaurant) => 
      restaurant.name.toLowerCase().includes(filterByName.trim().toLowerCase())
    )
    .map((restaurant) => (
      <RestaurantItem
        key={restaurant.name} // ✅ Add a unique key
        restaurantName={restaurant.name}
        restaurantImage={restaurant.image}
        restaurantRating={restaurant.rating}
        restaurantDeliveryTime={restaurant.deliveryTime}
      />
    ));

  if (allRestaurant.length === 0) {
    return null; // ✅ Hide component if no restaurants found
  }

  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Text style={{ color: "#3C493F", fontSize: 20, fontWeight: "bold", paddingBottom: 10 }}>
        Restaurants
      </Text>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 10,
        }}
        showsVerticalScrollIndicator={false} // Hide scrollbar for clean UI
      >
        {allRestaurant}
      </ScrollView>
    </View>
  );
};

export default RestaurantList;
