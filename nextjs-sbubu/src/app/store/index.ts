import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
  },
});

// Types untuk Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
