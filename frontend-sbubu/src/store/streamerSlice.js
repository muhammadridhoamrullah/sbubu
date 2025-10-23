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

      const response = await instance.get(`/donation/${username}`);
      console.log(response.data, "<< ini di sliceStreamer");

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
