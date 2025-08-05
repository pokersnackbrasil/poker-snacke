import { RootState } from '../../store'

export const selectUserUid = (state: RootState) => state.user.uid
export const selectUserName = (state: RootState) => state.user.nome
export const selectUserEmail = (state: RootState) => state.user.email
export const selectUserTelefone = (state: RootState) => state.user.telefone
export const selectUserRole = (state: RootState) => state.user.role
export const selectUserStatus = (state: RootState) => state.user.status
export const selectUserDinamico = (state: RootState) => state.user.dinamico
export const selectUserCurrentSession = (state: RootState) => state.user.currentSession