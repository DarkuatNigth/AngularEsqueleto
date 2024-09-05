import { createSelector, createFeatureSelector  } from "@ngrx/store";
import { objEstatusDiccionario } from "./dictionaries.reducer";

export const obtenerEstadoDiccionario = createFeatureSelector<objEstatusDiccionario>('dictionaries');

export const obtenerDiccionario = createSelector(
   obtenerEstadoDiccionario,
   (state) => state.objEntidad
)


export const obtenerLoading = createSelector(
  obtenerEstadoDiccionario,
  (state) => state.bstCargando
)

export const getIsReady = createSelector(
  obtenerEstadoDiccionario,
  (state) => state.objEntidad && !state.bstCargando
)

export const obtenerRoles = createSelector(
  obtenerDiccionario,
  (state) => state?.lstRol
)

export const obtenerCalificaciones = createSelector(
  obtenerDiccionario,
  (state) => state?.lstCalificaciones
)

export const obtenerHabilidades = createSelector(
  obtenerDiccionario,
  (state) => state?.lstHabilidades
)
export const obtenerEspecializacion = createSelector(
  obtenerDiccionario,
  (state) => state?.objEspecializacion
)
