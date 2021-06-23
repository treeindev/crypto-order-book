import { configureStore, createSlice } from '@reduxjs/toolkit';
import {  } from '@reduxjs/toolkit'
import { CURRENCY_GROUPS, DEFAULT_CURRENCY } from '../models/constants';
import { ActionGroupActivate, ActionDefault, ActionUpdateOrders, ActionCurrencyActivate } from '../models/actions';
import { AppState, OrderData } from '../models/state';

// Slice that will handle updates to the app state.
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user_currency: DEFAULT_CURRENCY,
    active_group: CURRENCY_GROUPS[DEFAULT_CURRENCY.id][0],
    group_list: CURRENCY_GROUPS[DEFAULT_CURRENCY.id],
    asks: {},
    bids: {}
  } as AppState,
  reducers: {
    activateCurrency: (state: AppState, action: ActionCurrencyActivate) => {
      // Update currency value.
      state.user_currency = action.payload;
      // Update the list of available groups for the new currency.
      state.group_list = CURRENCY_GROUPS[action.payload.id];
    },
    activateGroup: (state: AppState, action: ActionGroupActivate) => {
      state.active_group = action.payload
    },
    resetOrderBook: (state: AppState, action: ActionDefault) => {
      state.asks = {};
      state.bids = {};
    },
    updateOrders: (state: AppState, action: ActionUpdateOrders) => {
      const handleOrders = (orderBook: {[key: string]: OrderData}, orders: Array<any>) => {
        for(let i=0; i<orders.length; i++) {
          // Price tick size can be up to 0.05, multiple by 100 to ensure no decimals are processed.
          const price = orders[i][0];
          const size = orders[i][1];
          const value = (price * 100).toString();

          // Remove an order price if the size is set to 0
          if (size === 0) {
            delete orderBook[value];
            continue;
          }

          // Update state
          orderBook[value] = {
            price: orders[i][0],
            size: size
          };
        }
      }
      handleOrders(state.bids, action.payload.bids);
      handleOrders(state.asks, action.payload.asks);
    }
  },
})

// Store object containing a single reducer.
export const store = configureStore({
  reducer: appSlice.reducer
});

// List of actions that should be used to update the state.
export const {
  activateGroup,
  activateCurrency,
  updateOrders,
  resetOrderBook
} = appSlice.actions;