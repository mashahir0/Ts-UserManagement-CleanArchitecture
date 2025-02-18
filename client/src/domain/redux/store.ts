import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../../data/api/userApi";
import userReducer from '../redux/slilce/userSlice'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user : userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
