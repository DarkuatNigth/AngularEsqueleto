import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EstadoUsuario } from "./user.reducer";

export const getEstadoUsuario = createFeatureSelector<EstadoUsuario>('objUsuario');

export const getUsuario = createSelector(
  getEstadoUsuario,
  (state) => state.objEntity
);

export const getLoading = createSelector(
  getEstadoUsuario,
  (state) => state.blLoading
);

export const getEsAutorizado = createSelector(
  getEstadoUsuario,
  (state) => !!state.strUid
);
