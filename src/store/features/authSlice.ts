import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface User {
//   email: string;
//   password: string;
//   _id: number;
// }

interface AuthState {
  user: string;
  access: string;
  refresh: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: '',
  access: '',
  refresh: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem('user', action.payload);
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem('access', action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem('refresh', action.payload);
    },
    logout: (state) => {
      state.user = '';
      state.access = '';
      state.refresh = '';
      state.isAuthenticated = false;

      localStorage.removeItem('user');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
  },
});

export const { setUser, setToken, logout, setRefreshToken } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
