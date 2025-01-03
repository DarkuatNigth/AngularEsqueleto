import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import * as  objForm from './form/form.reducer';
export interface ProfileState{
 objForm: objForm.FormState;
}


export const Reducers: ActionReducerMap<ProfileState> = {
   objForm: objForm.reducer
};

export const Effects: any[]=[];
export const getProfileState = createFeatureSelector<ProfileState>('profile');
