import { createSlice } from "@reduxjs/toolkit";

export const tiktokSlice = createSlice({
  name: "tiktok",
  initialState: {
    data: null,
    error: null,
    loading: false,
    isComplete: false,
  },
  reducers: {
    tiktokRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.isComplete = false;
    },
    tiktokSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isComplete = true;
    },
    tiktokError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isComplete = false;
    },
    tiktokReset: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
      state.isComplete = false;
    },
  },
});

export const { tiktokRequest, tiktokSuccess, tiktokError, tiktokReset } =
  tiktokSlice.actions;

export function fetchTiktokMetadata(tiktokUrl) {
  return async (dispatch) => {
    try {
      dispatch(tiktokRequest());

      const tikWmApiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(
        tiktokUrl
      )}`;

      const response = await fetch(tikWmApiUrl);

      if (!response.ok) {
        throw new Error("Failed to fetch TikTok metadata");
      }

      const data = await response.json();

      dispatch(tiktokSuccess(data.data));
    } catch (error) {
      dispatch(
        tiktokError(
          error?.response?.data?.message || "Failed to fetch TikTok metadata"
        )
      );
    }
  };
}

export default tiktokSlice.reducer;
