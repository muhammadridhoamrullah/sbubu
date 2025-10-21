import { createSlice } from "@reduxjs/toolkit";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    data: null,
    loading: false,
    error: null,
    isRegistered: false,
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isRegistered = true;
    },
    registerError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isRegistered = false;
    },
  },
});

export const { registerRequest, registerSuccess, registerError } =
  registerSlice.actions;

export default registerSlice.reducer;
