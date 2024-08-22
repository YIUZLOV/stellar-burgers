import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TStateOrdersHistory = {
  orders: TOrder[];
  loading: boolean;
  error: null | string | undefined;
};

const initialState: TStateOrdersHistory = {
  orders: [],
  loading: false,
  error: null
};

export const ordersHistory = createAsyncThunk(
  'user/orderHistory',
  getOrdersApi
);

export const historyOrdersSlice = createSlice({
  name: 'ordershistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ordersHistory.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(ordersHistory.fulfilled, (state, action) => {
        (state.orders = action.payload),
          (state.loading = false),
          (state.error = null);
      })
      .addCase(ordersHistory.rejected, (state, action) => {
        (state.error = action.error.message || 'Error orders history'),
          (state.loading = false);
      });
  },
  selectors: {
    getUserOrdersHistory: (state) => state.orders,
    getUserOrdersHistoryError: (state) => state.error,
    getUserOrdersLoading: (state) => state.loading
  }
});

export default historyOrdersSlice;

export const {
  getUserOrdersHistory,
  getUserOrdersHistoryError,
  getUserOrdersLoading
} = historyOrdersSlice.selectors;
