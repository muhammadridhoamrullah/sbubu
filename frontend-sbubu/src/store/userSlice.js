import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    userRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    userSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    userError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { userRequest, userSuccess, userError } = userSlice.actions;

export function fetchUserData() {
  return async (dispatch) => {
    try {
      dispatch(userRequest());

      const access_token = localStorage.access_token;

    //   await new Promise((resolve) => setTimeout(resolve, 10000));

      const response = await instance.get("/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      dispatch(userSuccess(response.data.user));
    } catch (error) {
      dispatch(
        userError(error.response.data.message || "Failed to fetch user data")
      );
    }
  };
}

export default userSlice.reducer;
