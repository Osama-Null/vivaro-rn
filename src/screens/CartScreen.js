import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useCart } from "../context/CartContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const navigation = useNavigation();
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Middle: Trash Icon */}
        <TouchableOpacity
          style={styles.trashButton}
          onPress={() => removeFromCart(item.id, item.notes)}
        >
          <Ionicons name="trash" size={24} color="orange" />
        </TouchableOpacity>
      </View>
      {/* Left: Item Details and Quantity Controls */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>

        {item.notes && (
          <Text style={styles.itemNotes}>
            {item.notes}{" "}
            <FontAwesome6 name="pen-to-square" size={15} color="orange" />
          </Text>
        )}
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Right: Dish Image */}
        <Image
          source={{ uri: item.image }}
          style={styles.itemImage}
          resizeMode="cover"
        />
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.notes, -1)}
          >
            <Text style={styles.quantityButton}>–</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, item.notes, 1)}
          >
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty!</Text>
          <FontAwesome6 name="sad-tear" size={50} color="orange" />
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              backgroundColor: "orange",
              borderRadius: 10,
              padding: 10,
              width: "20%",
              alignItems: "center",
            }}
            onPress={clearCart}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              Clear
            </Text>
          </TouchableOpacity>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.id}-${item.notes}-${index}`}
            contentContainerStyle={styles.list}
          />
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate("Payment")}
            >
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282A36",
    padding: 20,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "orange",
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 4,
  },
  emptyText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#3B3F4A",
    padding: 15,
    borderRadius: 10,
    height: 130,
    paddingTop: 30,
    marginTop: 20,
  },
  itemDetails: {
    flex: 1,
    marginRight: 10,
    marginLeft: 20,
    alignSelf: "center",
    paddingBottom: 15,
  },
  itemName: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "orange",
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    fontSize: 30,
    color: "orange",
    paddingHorizontal: 10,
  },
  quantityText: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 10,
  },
  itemNotes: {
    fontSize: 12,
    color: "#7E8D85",
  },
  trashButton: {
    marginRight: 10,
    alignSelf: "center",
    paddingBottom: 10,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemQuantity: {
    fontSize: 14,
    color: "white",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  total: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  checkoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  list: {
    paddingBottom: 20,
  },
});

export default CartScreen;
