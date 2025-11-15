import { createSlice } from "@reduxjs/toolkit";
import z from "zod";
import Cookie from "js-cookie";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    dataLogin: null,
    errorLogin: null,
    loadingLogin: false,
    isLogin: false,
  },
  reducers: {
    loginRequest: (state) => {
      state.loadingLogin = true;
      state.errorLogin = null;
    },
    loginSuccess: (state, action) => {
      state.loadingLogin = false;
      state.dataLogin = action.payload;
      state.isLogin = true;
    },
    loginError: (state, action) => {
      state.loadingLogin = false;
      state.errorLogin = action.payload;
      state.isLogin = false;
    },
    loginReset: (state) => {
      state.dataLogin = null;
      state.errorLogin = null;
      state.loadingLogin = false;
      state.isLogin = false;
    },
  },
});

type DataFormLogin = {
  identifier: string;
  password: string;
};

export const { loginRequest, loginSuccess, loginError, loginReset } =
  loginSlice.actions;

export function doLogin(FormLogin: DataFormLogin) {
  return async (dispatch: any) => {
    try {
      dispatch(loginRequest());

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormLogin),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }

      const data = await response.json();

      Cookie.set("accessToken", data.accessToken);

      dispatch(loginSuccess(data.accessToken));
    } catch (error) {
      let errorMessage = "An unknown error occurred.";
      if (error instanceof z.ZodError) {
        const path = error.issues[0].path[0];
        const message = error.issues[0].message;
        errorMessage = `Error in ${path.toString()}: ${message}`;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      dispatch(loginError(errorMessage));
    }
  };
}

export default loginSlice.reducer;
