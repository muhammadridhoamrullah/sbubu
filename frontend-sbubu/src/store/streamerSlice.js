import { createSlice } from "@reduxjs/toolkit";
import instance from "../axiosInstance";

export const streamerSlice = createSlice({
  name: "streamer",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    streamerRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    streamerSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    streamerError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { streamerRequest, streamerSuccess, streamerError } =
  streamerSlice.actions;

export function fetchStreamerData(username) {
  return async (dispatch) => {
    try {
      dispatch(streamerRequest());

      // simulasi loading 10 detik
      // await new Promise((resolve) => setTimeout(resolve, 10000));

      const response = await instance.get(`/donation/${username}`);

      dispatch(streamerSuccess(response.data));
    } catch (error) {
      dispatch(
        streamerError(
          error.response.data.message || "Failed to fetch streamer data"
        )
      );
    }
  };
}

export default streamerSlice.reducer;
