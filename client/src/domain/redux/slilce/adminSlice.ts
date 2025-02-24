
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

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    clearAdmin: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setAdmin , clearAdmin } = adminSlice.actions;
export default adminSlice.reducer;