import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserData {
	email: string;
	status: boolean;
	id: string;
	nome: string;
  dinamico:boolean;
  currentSession?:string|null;
}
interface UserState {
	userData: UserData|null;
	levelAccess: string[] | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	userData: null,
	levelAccess: null,
	loading: false,
	error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action:PayloadAction<UserData|null>) => {
      state.userData = action.payload ;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    setLevelAccess: (state, action) => {
      state.levelAccess = [String(action.payload).trim()];
    },

    clearUserData: (state) => {
      state.userData = null;
      state.error=null;
      state.levelAccess=null;
      state.loading=false;
    },
  },
});

export const { setUserData, setLoading, setError, setLevelAccess, clearUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
