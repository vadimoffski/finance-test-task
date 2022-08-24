import { configureStore } from '@reduxjs/toolkit';
import tickerSlice from './app/tickerSlice';

export const store = configureStore({
  reducer: {
    ticker: tickerSlice,
  }
});