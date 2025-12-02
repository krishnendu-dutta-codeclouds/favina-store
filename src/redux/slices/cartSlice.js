import { createSlice } from '@reduxjs/toolkit';

function getCartKey(user) {
  if (user && user.email) {
    return `cart_${user.email}`;
  }
  return 'cart_guest';
}
function loadCart(user) {
  try {
    const key = getCartKey(user);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}
function saveCart(user, items) {
  try {
    const key = getCartKey(user);
    localStorage.setItem(key, JSON.stringify(items));
  } catch {}
}
function clearCartStorage(user) {
  try {
    const key = getCartKey(user);
    localStorage.removeItem(key);
  } catch {}
}


const initialState = {
  items: [],
  isCartOpen: false,
  cartCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCartForUser: (state, action) => {
      state.items = loadCart(action.payload);
      state.cartCount = state.items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity || 1;
      } else {
        state.items.push({ ...item, quantity: item.quantity || 1 });
      }
      state.cartCount = state.items.reduce((sum, i) => sum + (i.quantity || 1), 0);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.cartCount = state.items.reduce((sum, i) => sum + (i.quantity || 1), 0);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) item.quantity = quantity;
      state.cartCount = state.items.reduce((sum, i) => sum + (i.quantity || 1), 0);
    },
    clearCart: (state, action) => {
      state.items = [];
      state.cartCount = 0;
      clearCartStorage(action?.payload);
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, loadCartForUser } =
  cartSlice.actions;

export const persistCartMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  if (
    action.type.startsWith('cart/') &&
    ['addToCart', 'removeFromCart', 'updateQuantity', 'clearCart'].some((type) => action.type.endsWith(type))
  ) {
    const user = state.auth.user;
    saveCart(user, state.cart.items);
  }
  return result;
};

export default cartSlice.reducer;