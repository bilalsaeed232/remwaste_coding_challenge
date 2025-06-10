// Custom hook for managing shopping cart functionality

import { useState } from 'react';
import { CartItem, CartSummary, EnrichedSkip } from '../types/skip';

/**
 * Custom hook for managing shopping cart state and operations
 * Handles adding/removing items, quantity updates, and cart calculations
 */
export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add skip to cart or increase quantity if already exists
  const addToCart = (skip: EnrichedSkip, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.skip.id === skip.id);
      
      if (existingItem) {
        // Update quantity of existing item
        return prevItems.map(item =>
          item.skip.id === skip.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item to cart
        return [...prevItems, { skip, quantity, addedAt: new Date() }];
      }
    });
  };

  // Remove skip from cart completely
  const removeFromCart = (skipId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.skip.id !== skipId));
  };

  // Update quantity of specific item
  const updateQuantity = (skipId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(skipId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.skip.id === skipId
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Check if skip is in cart
  const isInCart = (skipId: number): boolean => {
    return cartItems.some(item => item.skip.id === skipId);
  };

  // Get quantity of specific skip in cart
  const getQuantity = (skipId: number): number => {
    const item = cartItems.find(item => item.skip.id === skipId);
    return item ? item.quantity : 0;
  };

  // Calculate cart summary
  const getCartSummary = (): CartSummary => {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.skip.price_before_vat * item.quantity), 0);
    const totalVat = cartItems.reduce((sum, item) => sum + (item.skip.vat * item.quantity), 0);
    const grandTotal = subtotal + totalVat;

    return {
      totalItems,
      subtotal,
      totalVat,
      grandTotal
    };
  };

  // Cart UI controls
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getQuantity,
    getCartSummary,
    openCart,
    closeCart,
    toggleCart
  };
};