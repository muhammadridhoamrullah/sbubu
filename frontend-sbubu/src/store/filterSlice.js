import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    filterRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    filterSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    filterError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    filterReset: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { filterRequest, filterSuccess, filterError, filterReset } =
  filterSlice.actions;

export function doFiltering(type, value) {
  return async (dispatch) => {
    try {
      dispatch(filterRequest());
      const access_token = localStorage.access_token;

      const response = await instance.post(
        "/user/add-banned-word",
        {
          type,
          value,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      dispatch(filterSuccess(response.data));
    } catch (error) {
      dispatch(
        filterError(
          error.response?.data?.message || error.message || "An error occurred"
        )
      );
    }
  };
}

export default filterSlice.reducer;
