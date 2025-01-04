import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as  objForm from './form/form.reducer';

import * as formUser from './user/user.reducer';
import { UserEffects } from "./user";


export interface ProfileState{
 objForm: objForm.FormState;
 objUser: formUser.UsuarioEstado;
}


export const Reducers: ActionReducerMap<ProfileState> = {
   objForm: objForm.reducer,
   objUser: formUser.Reducer
};

export const Effects: any[]=[];
export const getProfileState = createFeatureSelector<ProfileState>('profile');
