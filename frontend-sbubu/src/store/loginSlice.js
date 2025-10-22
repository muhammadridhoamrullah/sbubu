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
    loginSucess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    loginError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
  },
});

export const { loginRequest, loginSucess, loginError } = loginSlice.actions;

export function doLogin(formData) {
  return async (dispatch) => {
    try {
      dispatch(loginRequest());

      // Panggil API
      const response = await instance.post("/user/login", formData);
      console.log(response.data, "<< response loginSlice");

      localStorage.access_token = response.data.access_token;

      dispatch(loginSucess(response.data));
    } catch (error) {
      dispatch(loginError(error.response.data.message || "Login failed"));
    }
  };
}

export default loginSlice.reducer;
