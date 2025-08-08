import { createSlice } from '@reduxjs/toolkit';

const loginUser = async (credentials) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const found = users.find(
    u => u.email === credentials.email && u.password === credentials.password
  );
  if (!found) {
    throw new Error('Invalid email or password');
  }
  const { password, ...userWithoutPassword } = found;
  return userWithoutPassword;
};

const registerUser = async (userData) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.some(u => u.email === userData.email)) {
    throw new Error('User already exists');
  }
  const newUser = {
    ...userData,
    id: Date.now().toString(),
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const loginThunk = (credentials) => async (dispatch) => {
  dispatch(authSlice.actions.loginPending());
  try {
    const user = await loginUser(credentials);
    dispatch(authSlice.actions.loginFulfilled(user));
  } catch (error) {
    dispatch(authSlice.actions.loginRejected(error.message));
  }
};

export const registerThunk = (userData) => async (dispatch) => {
  dispatch(authSlice.actions.registerPending());
  try {
    const user = await registerUser(userData);
    dispatch(authSlice.actions.registerFulfilled(user));
  } catch (error) {
    dispatch(authSlice.actions.registerRejected(error.message));
  }
};

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('user'),
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem('user', JSON.stringify(state.user));
      if (state.user && state.user.id) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const idx = users.findIndex(u => u.id === state.user.id);
        if (idx !== -1) {
          users[idx] = { ...users[idx], ...action.payload };
          localStorage.setItem('users', JSON.stringify(users));
        }
      }
    },

    loginPending: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    loginFulfilled: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    loginRejected: (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Login failed';
    },
    registerPending: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    registerFulfilled: (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    registerRejected: (state, action) => {
      state.status = 'failed';
      state.error = action.payload || 'Registration failed';
    },
  },
});

export const { logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;