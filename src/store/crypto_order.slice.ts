import { createSlice } from '@reduxjs/toolkit';
import { CURRENCY_GROUPS, DEFAULT_CURRENCY } from '../utils/constants';
import { 
    ActionGroupActivate, 
    ActionDefault, 
    ActionUpdateOrders,
    ActionCurrencyActivate
} from '../models/actions';
import { CryptoState, OrderData } from '../models/state';

// Slice that will handle updates to the Crypto Order Book.
export const cryptoBookSlice = createSlice({
  name: 'crypto',
  initialState: {
    user_currency: DEFAULT_CURRENCY,
    active_group: CURRENCY_GROUPS[DEFAULT_CURRENCY.id][0],
    group_list: CURRENCY_GROUPS[DEFAULT_CURRENCY.id],
    asks: {},
    bids: {},
    exchange_ratio: ""
  } as CryptoState,
  reducers: {
    activateCurrency: (state: CryptoState, action: ActionCurrencyActivate) => {
      // Update currency value.
      state.user_currency = action.payload;
      // Update the list of available groups for the new currency.
      state.group_list = CURRENCY_GROUPS[action.payload.id];
    },
    activateGroup: (state: CryptoState, action: ActionGroupActivate) => {
      state.active_group = action.payload
    },
    setExchangeRation: (state: CryptoState, action: ActionDefault) => {
      state.exchange_ratio = action.payload
    },
    resetOrderBook: (state: CryptoState, action: ActionDefault) => {
      state.asks = {};
      state.bids = {};
    },
    updateOrders: (state: CryptoState, action: ActionUpdateOrders) => {
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
});