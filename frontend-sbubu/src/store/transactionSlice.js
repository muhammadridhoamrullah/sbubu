import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    data: null,
    error: null,
    loading: false,
  },
  reducers: {
    transactionRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    transactionSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    transactionError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    transactionReset: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  transactionRequest,
  transactionSuccess,
  transactionError,
  transactionReset,
} = transactionSlice.actions;

export function fetchTransactionDetails(orderId) {
  return async (dispatch) => {
    try {
      dispatch(transactionRequest());

      const response = await instance.get(`/donation/transaction/${orderId}`);

      dispatch(transactionSuccess(response.data.findDonation));
    } catch (error) {
      dispatch(
        transactionError(
          error?.response?.data?.message ||
            "Failed to fetch transaction details"
        )
      );
    }
  };
}

export default transactionSlice.reducer;
