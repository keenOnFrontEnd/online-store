import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/auth/authSlice';
import itemsSlice from './features/items/itemsSlice';
import basketSlce from './features/basket/basketSlice'
import searchSlice from './features/search/searchSlice';


export const store = configureStore({
  reducer: {
    auth: authSlice,
    items: itemsSlice,
    basket: basketSlce,
    search: searchSlice
  },
});
