import { createSlice } from "@reduxjs/toolkit";

interface UserState {
	userData: object;
	levelAccess: string | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	userData: {},
	levelAccess: null,
	loading: false,
	error: null,
};



export const userSlice = createSlice({
	name: "user",
  	initialState,
  reducers: {
	setUserData: (state, action) => {
	  state.userData = action.payload;
	},
	setLoading: (state, action) => {
	  state.loading = action.payload;
	},
	setError: (state, action) => {
	  state.error = action.payload;
	},

	setLevelAccess: (state, action) => {
		state.levelAccess = action.payload;
	},

	clearUserData: (state) => {
		state.userData = {};
	},

  },
});

export const { setUserData, setLoading, setError, setLevelAccess, clearUserData } = userSlice.actions;
export const userReducer = userSlice.reducer;
