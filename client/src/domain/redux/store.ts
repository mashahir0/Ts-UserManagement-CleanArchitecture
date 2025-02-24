import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../../data/api/userApi";
import userReducer from '../redux/slilce/userSlice'
import adminReducer from '../redux/slilce/adminSlice'
import { adminApi } from "../../data/api/adminApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";



const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"], 
};
const  adminPersistConfig= {
  key: "admin",
  storage,
  whitelist: ["user"], 
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [adminApi.reducerPath] : adminApi.reducer,
    user : persistedUserReducer,
    admin: persistedAdminReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(userApi.middleware)
  .concat(adminApi.middleware),
});


export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;