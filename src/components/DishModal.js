import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const DishModal = ({ visible, dish, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  if (!dish) return null;

  const handleAddToCart = () => {
    onAddToCart({ ...dish, quantity, notes });
    setQuantity(1); // Reset after adding
    setNotes("");
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons
              name="close"
              size={28}
              color="orange"
              paddingBottom="10"
            />
          </TouchableOpacity>

          {/* Dish Details */}
          <Image source={{ uri: dish.image }} style={styles.dishImage} />
          <Text style={styles.dishName}>{dish.name}</Text>
          <Text style={styles.dishPrice}>${dish.price.toFixed(2)}</Text>
          <Text style={styles.dishDescription}>{dish.description}</Text>

          {/* Notes Input */}
          <TextInput
            style={styles.notesInput}
            placeholder="Special instructions (e.g., no onions)"
            placeholderTextColor="#7E8D85"
            value={notes}
            onChangeText={setNotes}
            multiline
          />

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.negaButton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.plusButton}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#282A36",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  dishImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  dishName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  dishPrice: {
    fontSize: 18,
    color: "orange",
    marginBottom: 10,
  },
  dishDescription: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
  },
  notesInput: {
    backgroundColor: "#3B3F4A",
    color: "white",
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  plusButton: {
    fontSize: 30,
    color: "orange",
    paddingHorizontal: 20,
  },
  negaButton: {
    fontSize: 30,
    color: "orange",
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 20,
    color: "white",
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DishModal;
