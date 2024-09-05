import { Diccionarios, objDiccionario } from "./dictionaries.models";
import * as fromActions from './dictionaries.actions';

export interface objEstatusDiccionario {
  objEntidad: Diccionarios | null;
  bstCargando: boolean | null;
  strError: string | null;
}

const initialState: objEstatusDiccionario = {
  objEntidad:null,
  bstCargando:null,
  strError:null
}

export function reducer(objEstado = initialState, action: fromActions.All | any): objEstatusDiccionario{
  switch(action.type){
    case fromActions.Types.READ:{
      return {...objEstado, bstCargando: true, strError: null};
    }
    case fromActions.Types.READ_SUCCESS:{
      return {...objEstado, objEntidad: action.objDiccionario  , bstCargando: false, strError:null};
    }
    case fromActions.Types.READ_ERROR:{
      return {...objEstado, bstCargando: false, objEntidad: null, strError: action.strError };
    }
    default:{
      return objEstado;
    }
  }
}
