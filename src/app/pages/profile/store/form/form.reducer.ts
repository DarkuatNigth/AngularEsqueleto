import { objProfileForm } from "./form.models";

import * as fromActions from './form.actions';

export type FormState = objProfileForm;

const initalState : FormState = {
  objPersonal : null,
  objProfessional: null
}

export function reducer(state = initalState, action: fromActions.All | any):FormState{
  switch(action.type){
    case fromActions.Types.SET:{
      return {...state, ...action.objForm}
    }

    case fromActions.Types.UPDATE:{
      return {...state, ...action.objChanges}
    }

    case fromActions.Types.CLEAR:{
      return {...initalState}
    }

    default:{
      return state;
    }
  }

}
