import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import streamerReducer from "./streamerSlice";
import pembayaranReducer from "./pembayaranSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    streamer: streamerReducer,
    pembayaran: pembayaranReducer,
  },
});
