import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '../redux/hooks';

const CartQuantityContext = createContext();

export const CartQuantityProvider = ({ children }) => {
  const { user } = useAuth();
  const [cartQuantities, setCartQuantities] = useState({});

  useEffect(() => {
    if (!user?.id) return;
    const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
    const userCart = Array.isArray(allCarts[user.id]) ? allCarts[user.id] : [];
    const quantities = {};
    userCart.forEach(item => {
      quantities[item.id] = item.quantity;
    });
    setCartQuantities(quantities);
  }, [user?.id]);


  useEffect(() => {
    if (!user?.id) return;
    const allCarts = JSON.parse(localStorage.getItem('carts') || '{}');
    const userCart = Array.isArray(allCarts[user.id]) ? allCarts[user.id] : [];
    const updatedCart = userCart.map(item => ({
      ...item,
      quantity: cartQuantities[item.id] || item.quantity,
    }));
    allCarts[user.id] = updatedCart;
    localStorage.setItem('carts', JSON.stringify(allCarts));
  }, [cartQuantities, user?.id]);


  const getQuantity = (productId) => {
    return cartQuantities[productId] || 1;
  };


  const setQuantity = (productId, qty) => {
    setCartQuantities(prev => ({ ...prev, [productId]: qty }));
    window.dispatchEvent(new Event('cartChanged'));
  };


  const removeProduct = (productId) => {
    setCartQuantities(prev => {
      const updated = { ...prev };
      delete updated[productId];
      return updated;
    });
    window.dispatchEvent(new Event('cartChanged'));
  };

  return (
    <CartQuantityContext.Provider value={{ cartQuantities, getQuantity, setQuantity, removeProduct }}>
      {children}
    </CartQuantityContext.Provider>
  );
};

export const useCartQuantity = () => useContext(CartQuantityContext);
