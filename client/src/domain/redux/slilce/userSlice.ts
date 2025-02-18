// // src/Redux/Slice/UserSlice/userSlice.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserState {
//   id: string | null;
//   name: string | null;
//   email: string | null;
//   token: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: UserState = {
//   id: null,
//   name: null,
//   email: null,
//   token: localStorage.getItem("userToken") || null,
//   isAuthenticated: !!localStorage.getItem("userToken"),
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<{ id: string; name: string; email: string; token: string }>) => {
//       state.id = action.payload.id;
//       state.name = action.payload.name;
//       state.email = action.payload.email;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       localStorage.setItem("userToken", action.payload.token);
//     },
//     clearUser: (state) => {
//       state.id = null;
//       state.name = null;
//       state.email = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       localStorage.removeItem("userToken");
//     },
//   },
// });

// export const { setUser, clearUser } = userSlice.actions;
// export default userSlice.reducer;





import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
interface UserState {
  user: {
    email: string;
    name: string;
    role: string;
    _id: string;
  } | null;
  accessToken: string | null;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearUser: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
