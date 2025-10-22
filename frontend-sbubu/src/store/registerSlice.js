import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

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
      state.isRegistered = false;
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
    registerReset: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.isRegistered = false;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerError,
  registerReset,
} = registerSlice.actions;

export function doRegister(formData) {
  return async (dispatch) => {
    try {
      dispatch(registerRequest());
      // Panggil API
      const response = await instance.post("/user/register", formData);
      console.log(response, "<< response");

      dispatch(registerSuccess(response.data));
    } catch (error) {
      console.log(error, "<< error di doRegister");

      dispatch(
        registerError(error.response.data.message || "Registration failed")
      );
    }
  };
}

export default registerSlice.reducer;
