import { Usuario } from "./user.models";
import * as fromActions from './user.actions';

export interface EstadoUsuario {
  objEntity : Usuario | null;
  strUid:string | null;
  blLoading:boolean | null;
  strError:string | null;
}

const objEstadoUsuario: EstadoUsuario = {
  objEntity : null,
  strUid:null,
  blLoading:null,
  strError:null
}

export function fnReducer(objEstado = objEstadoUsuario, objAcciones: fromActions.All | any): EstadoUsuario{
  switch(objAcciones.type){
    //Init
    case fromActions.objTipos.INIT:{
      return{...objEstado, blLoading: true};
    }
    case fromActions.objTipos.INIT_AUTHORIZED:{
      return{...objEstado,objEntity:objAcciones.objUsuario,strUid:objAcciones.strUid, blLoading: true};
    }
    case fromActions.objTipos.INIT_UNAUTHORIZED:{
      return{...objEstado, blLoading: false, objEntity:null, strError:null};
    }
    case fromActions.objTipos.INIT_ERROR:{
      return{...objEstado, strError:objAcciones.strError,blLoading: true};
    }
    // Sign In o Login
    case fromActions.objTipos.SIGN_IN_EMAIL: {
      //console.log(objEstado);

      console.log(objAcciones);
      return {...objEstado, blLoading:true}
    }
    case fromActions.objTipos.SIGN_IN_EMAIL_SUCCESS: {
      return {...objEstado, objEntity:objAcciones.objUsuario, strUid:objAcciones.strUid , blLoading:false, strError:null}
    }
    case fromActions.objTipos.SIGN_IN_EMAIL_ERROR: {
      return {...objEstado, blLoading:false, strError:objAcciones.strError};
    }

    // Sign Up o Registro de sesion Usuario
    case fromActions.objTipos.SIGN_UP_EMAIL: {
      //console.log(objEstado);

      //console.log(objAcciones);
      return {...objEstado, blLoading:true}
    }
    case fromActions.objTipos.SIGN_UP_EMAIL_SUCCESS: {
      return {...objEstado,  strUid:objAcciones.strUid , blLoading:false, strError:null}
    }
    case fromActions.objTipos.SIGN_UP_EMAIL_ERROR: {
      return {...objEstado, blLoading:false, strError:objAcciones.strError};
    }

    // Sign OUT o Salir de sesion de usuario
    case fromActions.objTipos.SIGN_OUT_EMAIL: {
      return {...objEstado, blLoading:true}
    }
    case fromActions.objTipos.SIGN_OUT_EMAIL_SUCCESS: {
      return {...objEstadoUsuario}
    }
    case fromActions.objTipos.SIGN_OUT_EMAIL_ERROR: {
      return {...objEstado, blLoading:false, strError:objAcciones.strError};
    }

    default: {
      return objEstado;
    }
  }
}
