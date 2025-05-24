import { createSlice } from '@reduxjs/toolkit';
interface UserState {
  accessToken: string;
  refreshToken: string;
  user: any;
  language: string;
}
const initialState: UserState = {
  accessToken: '',
  refreshToken: '',
  user: '',
  language: localStorage.getItem('language') || 'en', // Default to 'en' if no language is set
};

export const userSlice = createSlice({
  name: 'user',
  initialState: { ...initialState, omar: 'asas' },
  reducers: {
    setCredentials: (state, action) => {
      state.refreshToken = action.payload.refreshToken;
      state.accessToken = action.payload.accessToken;
      if (action.payload.user) {
        state.user = action.payload;
      }
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
    logout: (state) => {
      localStorage.removeItem('user');
      state.accessToken = '';
      state.refreshToken = '';
      state.user = null;
    },
  },
});

export const { setCredentials, setLanguage, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
