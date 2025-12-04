import { createSlice } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface HeaderState {
  dataHeader: User | null;
  loadingHeader: boolean;
  errorHeader: string | null;
}

const initialState: HeaderState = {
  dataHeader: null,
  loadingHeader: false,
  errorHeader: null,
};

export const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    headerRequest: (state) => {
      state.loadingHeader = true;
      state.errorHeader = null;
    },
    headerSuccess: (state, action) => {
      state.loadingHeader = false;
      state.dataHeader = action.payload;
    },
    headerError: (state, action) => {
      state.loadingHeader = false;
      state.errorHeader = action.payload;
    },
  },
});

export const { headerRequest, headerSuccess, headerError } =
  headerSlice.actions;

export function fetchHeaderData() {
  return async (dispatch: any) => {
    try {
      dispatch(headerRequest());

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/users/me`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      dispatch(headerSuccess(data));
    } catch (error) {
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else {
        errorMessage = String(error);
      }
      dispatch(headerError(errorMessage));
    }
  };
}

export default headerSlice.reducer;
