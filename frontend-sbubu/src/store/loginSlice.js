import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: null,
    loading: false,
    error: null,
    isLoggedIn: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    logout: (state) => {
      state.data = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
    resetStateAfterLogin: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginError,
  logout,
  resetStateAfterLogin,
} = loginSlice.actions;

export function doLogin(formData) {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());

      // Panggil API
      const response = await instance.post("/user/login", formData);
      console.log(response.data, "<< response loginSlice");

      localStorage.access_token = response.data.access_token;

      dispatch(loginSuccess(response.data));
    } catch (error) {
      dispatch(loginError(error.response.data.message || "Login failed"));
    }
  };
}

export function doLogout() {
  return (dispatch) => {
    localStorage.removeItem("access_token");
    dispatch(logout());
  };
}

export default loginSlice.reducer;
