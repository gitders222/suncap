import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [cartTotal, setCartTotal] = useState(0);
  
  // Calculate cart total whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    );
    setCartTotal(total);
  }, [cartItems]);
  
  // Add item to cart
  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if item already in cart
      const existingItemIndex = prevItems.findIndex(item => item._id === product._id);
      
      if (existingItemIndex > -1) {
        // Item exists, increase quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Item does not exist, add with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  
  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item._id !== productId)
    );
  };
  
  // Update item quantity
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };
  
  return (
    <CartContext.Provider value={{
      cartItems,
      cartTotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};