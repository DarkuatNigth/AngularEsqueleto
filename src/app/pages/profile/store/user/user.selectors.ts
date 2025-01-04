import { createSelector } from "@ngrx/store";
import { UsuarioEstado } from "./user.reducer";
import { getProfileState, ProfileState } from "..";


export const getUserState = createSelector
(
  getProfileState,
  (state: ProfileState)=> state.objUser
);



export const getUser = createSelector
(
  getUserState,
  (state: UsuarioEstado)=> state.objEntidad
);



export const getLoading = createSelector
(
  getUserState,
  (state: UsuarioEstado)=> state.blLoading
);


export const getRole = createSelector
(
  getUserState,
  (state: UsuarioEstado)=> state.objEntidad?.strRoleId
);
