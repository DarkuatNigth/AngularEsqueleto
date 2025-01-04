import { Usuario } from "./user.models";
import * as fromActions from './user.actions';

export interface UsuarioEstado {
  objEntidad: Usuario | null,
  blLoading: boolean | null,
  strError: string | null
}

const initalState : UsuarioEstado={
  objEntidad: null,
  blLoading: null,
  strError: null
}


export function Reducer(state = initalState, objAction: fromActions.All | any): UsuarioEstado{
  switch(objAction.type){
    case fromActions.Types.READ:{
      return {...state, blLoading: true, strError: null};
    }
    case fromActions.Types.READ_SUCCESS:{
      return {...state, objEntidad: objAction.objUsuario, blLoading:false,strError: null};
    }
    case fromActions.Types.READ_ERROR:{
      return {...state,objEntidad: null, blLoading:false,strError: objAction.strError};
    }
    case fromActions.Types.CLEAR:{
      return {...initalState};
    }

    default:{
      return state;
    }
  }
}
