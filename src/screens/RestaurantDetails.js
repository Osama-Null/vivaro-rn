import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DishModal from "../components/DishModal";
import restaurants from "../data/restaurants";
import { useCart } from "../context/CartContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaskedView from "@react-native-community/masked-view";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { getAllRestaurants } from "../api/restaurants";

const RestaurantDetails = ({ route }) => {
  const navigation = useNavigation();
  const { restaurantId } = route.params;
  const { addToCart, cartItems } = useCart();
  const [restaurantsbe, setRestaurantsBe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  // Fetch restaurants from API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await getAllRestaurants();
        console.log("Fetched restaurants:", res);
        setRestaurantsBe(res || []);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
        setRestaurantsBe([]);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };
    fetchRestaurants();
  }, []);

  // Hide the tab bar when this screen is active
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          height: 50,
          backgroundColor: "#282A36", // Restore dark background
          borderColor: "#282A36",
          borderTopWidth: 0,
        },
      });
  }, [navigation]);

  // Find selected restaurant
  const selectedRestaurant = restaurantsbe.find(
    (restaurant) => restaurant._id === restaurantId
  );

  // Handle loading and not found states
  if (loading) {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          backgroundColor: "#282A36",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "orange",
          }}
        >
          Loading...
        </Text>
      </View>
    );
  }

  if (!selectedRestaurant) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "orange", textAlign: "center", marginTop: 50 }}>
          Restaurant not found
        </Text>
      </View>
    );
  }

  // Image to show as main
  const mainImageUri =
    selectedRestaurant.items?.length > 0
      ? selectedRestaurant.items[0].image
      : selectedRestaurant.image;

  const handleDishPress = (dish) => {
    setSelectedDish(dish);
    setModalVisible(true);
  };

  const handleAddToCart = (cartItem) => {
    addToCart({ ...cartItem, restaurantId });
    console.log("Added to cart:", cartItem);
    console.log("Current cartItems:", cartItems);
  };

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  // Log cartItems on every render to see if it updates
  console.log("Rendered cartItems:", cartItems);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* 1) Floating back arrow */}
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            left: 16,
            zIndex: 999,
            padding: 8,
            borderRadius: 20,
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color="orange" />
        </TouchableOpacity>

        {/* Restaurant Image */}
        <MaskedView
          style={{ width: "100%", height: 200 }}
          maskElement={
            // The mask is a radial gradient from white (center) to transparent (edges).
            <Svg height="200" width="100%">
              <Defs>
                <RadialGradient id="grad" cx="50%" cy="50%" r="50%">
                  {/* 
                  White (stopColor="#FFF") at 0% => fully visible
                  Transparent (stopOpacity="0") at 100% => fades out at edges
                */}
                  <Stop offset="0%" stopColor="#FFF" stopOpacity="1" />
                  <Stop offset="100%" stopColor="#FFF" stopOpacity="0" />
                </RadialGradient>
              </Defs>
              <Rect x="0" y="0" width="100%" height="200" fill="url(#grad)" />
            </Svg>
          }
        >
          {/* The actual image you want to fade */}
          <Image
            source={{ uri: mainImageUri }}
            style={{ width: "100%", height: 200 }}
            resizeMode="cover"
          />
        </MaskedView>

        {/* Restaurant Info */}
        <View
          style={{
            backgroundColor: "orange",
            marginTop: -50,
            borderRadius: 10,
            width: 370,
            height: 140,
            alignSelf: "center",
            padding: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              paddingBottom: 0,
            }}
          >
            {/* Img */}
            <View
              style={{
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                }}
                source={{ uri: selectedRestaurant.image }}
              />
            </View>
            {/* Text */}
            <View
              style={{
                height: 70,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {selectedRestaurant.name}
              </Text>
              <View
                style={{
                  width: 200,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                  }}
                >
                  {selectedRestaurant.description}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 5,
                }}
              >
                <AntDesign
                  name="star"
                  size={20}
                  color="#282A36"
                  style={{
                    textShadowColor: "orange",
                    textShadowOffset: { width: 0.5, height: 0.5 },
                    textShadowRadius: 2,
                    marginTop: 1,
                  }}
                />

                <Text style={{ fontSize: 16, color: "white" }}>
                  {selectedRestaurant.rating}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              height: 40,
              padding: 10,
              backgroundColor: "#282A36",
              marginTop: 8,
              borderRadius: 10,
              marginRight: 6,
            }}
          >
            {/* 1. First "column" */}
            <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
              <Ionicons name="time" size={21} color="orange" />

              <Text style={{ color: "white", marginTop: 2, fontSize: 12 }}>
                {selectedRestaurant.deliveryTime}
              </Text>
            </View>

            {/* 2. Second "column" */}
            <View style={{ flex: 1, flexDirection: "row", gap: 5 }}>
              <MaterialIcons
                name="delivery-dining"
                size={21}
                style={{
                  textShadowColor: "#282A36",
                  textShadowOffset: { width: 0.5, height: 0.5 },
                  textShadowRadius: 2,
                }}
                color={"orange"}
              />
              <Text style={{ color: "white", marginTop: 2, fontSize: 12 }}>
                KWD 1.000
              </Text>
            </View>

            {/* 4. Fourth "column" */}
            <View style={{ flexDirection: "row", marginBottom: 1 }}>
              <Text style={{ color: "white", fontSize: 12 }}>
                Delivered by{" "}
              </Text>
              <Text
                style={{ color: "orange", fontWeight: "bold", fontSize: 12 }}
              >
                ВИВАРО
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Section */}
        <View padding={20}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 10,
              color: "orange",
            }}
          >
            Menu
          </Text>
          {/* Master Container */}
          <View
            style={{
              marginTop: 10,
              width: "100%",
              gap: -10,
              justifyContent: "center",
            }}
          >
            {/* Menu Items */}
            {selectedRestaurant.items?.map((menuItem) => (
              <TouchableOpacity
                key={menuItem._id}
                onPress={() => handleDishPress(menuItem)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: -80,
                  }}
                >
                  {/* Text side - expand to fill row space */}
                  <View
                    style={{
                      marginRight: 10,
                      width: 200,
                      gap: 15,
                    }}
                  >
                    <Text style={{ fontWeight: "bold", color: "white" }}>
                      {menuItem.name}
                    </Text>
                    <View style={{ height: 50 }}>
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        {menuItem.description}
                      </Text>
                    </View>

                    <Text
                      style={{
                        marginTop: 10,
                        color: "white",
                      }}
                    >
                      ${menuItem.price.toFixed(2)}
                    </Text>
                  </View>

                  {/* Image side - fixed width and height */}
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      width: "40%",
                      height: 130,
                    }}
                  >
                    <Image
                      source={{ uri: menuItem.image }}
                      style={{
                        width: 140,
                        height: 120,
                        borderRadius: 5,
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 3,
                    backgroundColor: "orange",
                    marginVertical: 20,
                  }}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Dish Modal */}
      <DishModal
        visible={modalVisible}
        dish={selectedDish}
        onClose={() => setModalVisible(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Bottom Panel: View Cart Button */}
      {cartItems.length > 0 && (
        <View style={styles.bottomPanel}>
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() => navigation.navigate("Cart")}
          >
            <View style={styles.quantityCircle}>
              <Text style={styles.quantityText}>{totalQuantity}</Text>
            </View>
            <Text style={styles.viewCartText}>View Cart</Text>
            <Text style={styles.totalPriceText}>${totalPrice}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RestaurantDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282A36",
  },
  bottomPanel: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  viewCartButton: {
    backgroundColor: "orange",
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Spread items across the button
    paddingHorizontal: 20,
  },
  quantityCircle: {
    width: 30,
    height: 30,
    borderRadius: 15, // Fully rounded
    backgroundColor: "#282A36",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  viewCartText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  totalPriceText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
