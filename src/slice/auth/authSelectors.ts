import { RootState } from "../../store";

export const selectAuthUid = (state : RootState) => state.auth.uid
export const selectAuthStatus = (state : RootState) => state.auth.status
export const selectAuthError = (state : RootState) => state.auth.error
export const selectAuthAuthenticated = (state : RootState) => Boolean(state.auth.isAuthenticated)
