// context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.name === product.name);
      const updatedCart = existingItem
        ? prevCart.map(item => item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prevCart, { ...product, quantity: 1 }];
      
      // Save to local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (productName) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(item => item.name !== productName);
      
      // Save to local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const increaseQuantity = (productName) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
      );
      
      // Save to local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const decreaseQuantity = (productName) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map(item =>
        item.name === productName && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      
      // Save to local storage
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, calculateSubtotal }}>
      {children}
    </CartContext.Provider>
  );
};
