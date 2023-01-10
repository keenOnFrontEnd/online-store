import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import itemsSlice from './features/items/itemsSlice';



export const store = configureStore({
  reducer: {
    auth: authSlice,
    items: itemsSlice
  },
});
