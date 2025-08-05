import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string|null;
  telefone: string|null;
  status: boolean;
  uid: string|null;
  nome: string|null;
  dinamico: boolean;
  role: string[] | null;
  currentSession?: string | null;
}
const initialState: UserState ={
  email: null,
  telefone: null,
  status: false,
  uid: null,
  nome: null,
  dinamico: false,
  role: null,
  currentSession: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{
      email: string;
      telefone: string;
      status: boolean;
      uid: string;
      nome: string;
      dinamico: boolean;
      role: string[];
      currentSession?: string;
    }>) => {
      state.email = action.payload.email
      state.telefone = action.payload.telefone
      state.status = action.payload.status
      state.uid = action.payload.uid
      state.nome = action.payload.nome
      state.dinamico = action.payload.dinamico
      state.role = action.payload.role
      state.currentSession = action.payload.currentSession
    },
    clearUserData: (state) => {
      state.email = null
      state.telefone = null
      state.status = false
      state.uid = null
      state.nome = null
      state.dinamico = false
      state.role = null
      state.currentSession = null
    }
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
