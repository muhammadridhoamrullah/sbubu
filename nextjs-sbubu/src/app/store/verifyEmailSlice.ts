import { createSlice } from "@reduxjs/toolkit";

export const verifyEmailSlice = createSlice({
  name: "verifyEmail",
  initialState: {
    loading: false,
    data: null,
    error: null,
    isVerified: false,
  },
  reducers: {
    verifyEmailRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isVerified = false;
    },
    verifyEmailSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isVerified = true;
    },
    verifyEmailError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isVerified = false;
    },
  },
});

export const { verifyEmailRequest, verifyEmailSuccess, verifyEmailError } =
  verifyEmailSlice.actions;

export function verifyingEmail(token: string) {
  return async (dispatch: any) => {
    try {
      dispatch(verifyEmailRequest());

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/users/verifyEmail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
          cache: "no-store",
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to verify email");
      }

      const data = await response.json();

      dispatch(verifyEmailSuccess("Email verified successfully"));
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(verifyEmailError(errorMessage));
    }
  };
}

export default verifyEmailSlice.reducer;
