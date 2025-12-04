import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./registerSlice";
import loginReducer from "./loginSlice";
import verifyEmailReducer from "./verifyEmailSlice";
import headerReducer from "./headerSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    verifyEmail: verifyEmailReducer,
    header: headerReducer,
  },
});

// Types untuk Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
