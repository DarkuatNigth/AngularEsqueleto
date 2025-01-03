import { createSelector } from "@ngrx/store";
import { FormState } from "./form.reducer";
import { getProfileState, ProfileState } from "..";




export const getFromState = createSelector(
  getProfileState,
  (state: ProfileState) => state.objForm
)


export const getPersonalForm = createSelector(
  getFromState,
  (state: FormState) => !!state.objPersonal && state.objPersonal
)

export const getProfesionalForm = createSelector(
  getFromState,
  (state: FormState) => !!state.objProfessional && state.objProfessional
)
