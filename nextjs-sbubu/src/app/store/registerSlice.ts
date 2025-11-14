import { createSlice } from "@reduxjs/toolkit";
import z from "zod";

export const registerSlice = createSlice({
  name: "register",
  initialState: {
    loadingRegis: false,
    dataRegis: null,
    errorRegis: null,
    isRegistered: false,
  },
  reducers: {
    registerRequest: (state) => {
      state.loadingRegis = true;
      state.errorRegis = null;
    },
    registerSuccess: (state, action) => {
      state.loadingRegis = false;
      state.dataRegis = action.payload;
      state.isRegistered = true;
    },
    registerError: (state, action) => {
      state.loadingRegis = false;
      state.errorRegis = action.payload;
      state.isRegistered = false;
    },
    registerReset: (state) => {
      state.loadingRegis = false;
      state.dataRegis = null;
      state.errorRegis = null;
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

type FormRegister = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export function doRegister(FormRegis: FormRegister) {
  return async (dispatch: any) => {
    try {
      dispatch(registerRequest());

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(FormRegis),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(registerSuccess(data));
    } catch (error) {
      let errorMessage = "Registration failed";

      if (error instanceof z.ZodError) {
        const path = error.issues[0].path[0];
        const message = error.issues[0].message;
        errorMessage = `Error in ${path.toString()}: ${message}`;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      dispatch(registerError(errorMessage));
    }
  };
}

export default registerSlice.reducer;
