import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer, { persistCartMiddleware, loadCartForUser } from './slices/cartSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistCartMiddleware),
});

let currentUser = null;
store.subscribe(() => {
  const state = store.getState();
  const user = state.auth.user;
  if (user !== currentUser) {
    currentUser = user;
    store.dispatch(loadCartForUser(user));
  }
});