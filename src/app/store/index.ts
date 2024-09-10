import { ActionReducerMap } from "@ngrx/store";
import * as fromDiccionarios from './dictionaries';

import * as fromUsuario from './user';

export interface objEstado {
  objDiccionarios: fromDiccionarios.objEstatusDiccionario;
  objUsuario: fromUsuario.EstadoUsuario;
}

export const objReducer: ActionReducerMap<objEstado>= {
    objDiccionarios: fromDiccionarios.reducer,
    objUsuario: fromUsuario.fnReducer
};


export const objEffects =[
  fromDiccionarios.DiccionariosEffects,
  fromUsuario.fnEffectsUsuario
]
