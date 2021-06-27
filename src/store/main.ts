import { configureStore } from '@reduxjs/toolkit';
import { appSlice } from './app.slice';
import { cryptoBookSlice } from './crypto_order.slice';

// Store object containing a single reducer.
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    crypto: cryptoBookSlice.reducer
  }
});

// Export all actions ready for dispatch
export const {
  activateGroup,
  activateCurrency,
  updateOrders,
  resetOrderBook,
  setExchangeRation
} = cryptoBookSlice.actions;

export const {
  setModal,
  setLoading
} = appSlice.actions;