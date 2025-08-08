import { createSlice } from '@reduxjs/toolkit';


const getOrdersFromStorage = () => {
  if (typeof window !== 'undefined') {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  }
  return [];
};

const saveOrdersToStorage = (orders) => {
  try {
    localStorage.setItem('orders', JSON.stringify(orders));
  } catch {}
};

const getOrderById = (orderId) => {
  const orders = getOrdersFromStorage();
  return orders.find(o => o.id === orderId) || null;
};


export const createOrderThunk = (orderData) => async (dispatch) => {
  dispatch(orderSlice.actions.createOrderPending());
  try {
    const newOrder = {
      ...orderData,
      id: Date.now().toString(),
      status: 'processing',
    };
    const currentOrders = getOrdersFromStorage();
    const updatedOrders = [...currentOrders, newOrder];
    saveOrdersToStorage(updatedOrders);
    dispatch(orderSlice.actions.createOrderFulfilled(newOrder));
  } catch (error) {
    dispatch(orderSlice.actions.createOrderRejected(error.message));
  }
};

export { getOrdersFromStorage, getOrderById };

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: getOrdersFromStorage(),
    status: 'idle',
    error: null,
  },
  reducers: {
    createOrderPending: (state) => {
      state.status = 'loading';
    },
    createOrderFulfilled: (state, action) => {
      state.status = 'succeeded';
      state.orders.push(action.payload);
    },
    createOrderRejected: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export default orderSlice.reducer;