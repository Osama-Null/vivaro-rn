import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.id === item.id && i.notes === item.notes
      );
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id && i.notes === item.notes
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prevItems, { ...item, restaurantId: item.restaurantId }];
    });
  };

  const removeFromCart = (itemId, notes) => {
    setCartItems((prevItems) =>
      prevItems.filter((i) => !(i.id === itemId && i.notes === notes))
    );
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (itemId, notes, delta) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === itemId && item.notes === notes) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) return acc; // Remove item if quantity <= 0
          return [...acc, { ...item, quantity: newQuantity }];
        }
        return [...acc, item];
      }, [])
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
