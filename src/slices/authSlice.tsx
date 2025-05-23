import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "./index";


interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  loading: boolean;
  authChecked: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  authChecked: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.authChecked = false;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<UserData>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.authChecked = true;
    },
    loginFail(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isAuthenticated = false;
      state.loading = false;
      state.authChecked = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  logout,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
