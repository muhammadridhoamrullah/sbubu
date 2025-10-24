import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const pembayaranSlice = createSlice({
  name: "pembayaran",
  initialState: {
    data: null,
    loading: false,
    error: null,
    isCompleted: false,
  },
  reducers: {
    pembayaranRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isCompleted = false;
    },
    pembayaranSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isCompleted = true;
    },
    pembayaranError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isCompleted = false;
    },
  },
});

export const { pembayaranRequest, pembayaranSuccess, pembayaranError } =
  pembayaranSlice.actions;

export function lakukanPembayaran(dataPembayaran, username) {
  return async (dispatch) => {
    try {
      dispatch(pembayaranRequest());

      const response = await instance.post(
        `/donation/${username}/create`,
        dataPembayaran
      );

      dispatch(pembayaranSuccess(response.data));
    } catch (error) {
      dispatch(
        pembayaranError(
          error.response.data.message ||
            "Terjadi kesalahan saat melakukan pembayaran."
        )
      );
    }
  };
}

export default pembayaranSlice.reducer;
