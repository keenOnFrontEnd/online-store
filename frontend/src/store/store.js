import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import errorSlice from './features/errorSlice/errorSlice';



export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
