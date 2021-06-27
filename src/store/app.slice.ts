import { createSlice } from '@reduxjs/toolkit';
import { 
    ActionSocketError,
    ActionLoading
} from '../models/actions';
import { AppState } from '../models/state';

// Slice that will handle updates on the overall application.
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    modal: {
      active: false
    },
    loading: false
  } as AppState,
  reducers: {
    setModal: (state: AppState, action: ActionSocketError) => {
      state.modal = action.payload;
    },
    setLoading: (state: AppState, action: ActionLoading) => {
      state.loading = action.payload;
    }
  }
});