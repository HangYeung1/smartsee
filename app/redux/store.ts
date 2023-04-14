import companiesReducer from "./companiesSlice";
import userReducer from "./userSlice";
import { configureStore } from "@reduxjs/toolkit";

// Create store
const store = configureStore({
  reducer: {
    user: userReducer,
    companies: companiesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
