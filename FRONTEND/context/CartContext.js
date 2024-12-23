import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    AsyncStorage.setItem('cart', JSON.stringify([...cart, item]));
  };

  const loadCart = async () => {
    const storedCart = await AsyncStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, loadCart }}>
      {children}
    </CartContext.Provider>
  );
};
