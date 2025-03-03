import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import CategoryList from "../components/CategoryList";
import RestaurantList from "../components/RestaurantList";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../context/CartContext";

const HomeS = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <View style={styles.container}>
      {/* Brand & Cart */}
      <View
        style={{
          marginTop: 8,
          flexDirection: "row",
          alignItems: "center", // Align items in the row
          justifyContent: "space-between", // Pushes brand to center & cart to end
        }}
      >
        {/* Brand - Centered */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: "T",
              fontSize: 32,
              fontWeight: "bold",
              color: "orange",
              paddingLeft: 10,
              marginTop: 0,
            }}
          >
            ВИВАРО
          </Text>
        </View>

        {/* Cart - Aligned Right */}
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
          }}
          onPress={() => navigation.navigate("Cart")}
        >
          <FontAwesome6 name="cart-shopping" size={24} color="orange" />
          {totalQuantity > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{totalQuantity}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View
        style={{
          height: 100,
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -10,
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 1,
            borderRadius: 10,
            flexDirection: "row",
            backgroundColor: "rgba(255, 255, 255, 0.11)",
            justifyContent: "center",
          }}
        >
          <AntDesign name="search1" size={24} color="orange" paddingTop={9} />
          <TextInput
            style={{
              color: "white",
              fontSize: 20,
              width: "90%",
              padding: 10,
              flexDirection: "row",
              placeholderTextColor: "white",
            }}
            placeholder="Search food, groceries and more"
            placeholderTextColor="rgba(255, 255, 255, 0.21)"
            onChangeText={(text) => {
              setSearch(text);
            }}
            onFocus={() => setSelectedCategory(null)}
          />
        </View>
      </View>
      {/* Category List */}
      <CategoryList
        filterByName={search}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSearch={setSearch}
      />
      {/* "Clear Filter" button */}
      {selectedCategory && (
        <Button
          title="Clear Filter"
          onPress={() => setSelectedCategory(null)}
          color="rgba(255, 167, 0, 0.25)"
        />
      )}
      {/* Restaurant List */}
      <RestaurantList
        filterByName={search}
        filterByCategory={selectedCategory}
      />
    </View>
  );
};

export default HomeS;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#282A36",
    flex: 1,
    padding: 20,
  },
  cartBadge: {
    position: "absolute",
    top: -10,
    right: -5,
    backgroundColor: "rgba(90, 88, 88, 0.79)",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
  },
});
