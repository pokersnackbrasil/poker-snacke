import { createSlice } from "@reduxjs/toolkit";
import { loginWithEmail, logout, observeAuthState } from './authThunks'
import { REHYDRATE } from "redux-persist";

export type AuthStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

interface AuthState {
  uid:string|null;
  isAuthenticated: boolean;
  status:AuthStatus;
  error:string|null;
}

const initialState: AuthState = {
	uid : null,
	isAuthenticated:false,
	status:'idle',
	error: null,
};

interface RehydratePayload {
  auth?: AuthState;
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers:{},
	extraReducers:builder=>{
		builder
			.addCase(loginWithEmail.pending,state=>{
				state.status='loading'
			})
			.addCase(loginWithEmail.fulfilled,(state,action)=>{
				if (action.payload) {
					state.uid = action.payload.uid;
					state.isAuthenticated = true;
					state.status = 'succeeded';
					state.error = null;
				} else {
					state.status = 'failed';
					state.error = 'Erro inesperado no login.';
				}
			})
			.addCase(loginWithEmail.rejected,(state,action)=>{
				state.status = 'failed'
				state.error= action.error.message || "Erro desconhecido"
			})
			.addCase(observeAuthState.fulfilled, (state, action) => {
				if (action.payload) {
					state.uid = action.payload.uid;
					state.isAuthenticated = true;
				} else {
					state.uid = null;
					state.isAuthenticated = false;
					state.status='idle'
				}
			})
			.addCase(logout.fulfilled,state=>{
				state.uid = null
				state.status='idle'
				state.isAuthenticated = false;
				state.error = null;
			})
			.addCase(REHYDRATE, (state, action:{ type: string; payload?: RehydratePayload }) => {
				if (action.payload?.auth) {
						state.uid = action.payload.auth.uid;
						state.isAuthenticated = action.payload.auth.isAuthenticated;
				}
			})

	}

});

export default authSlice.reducer
