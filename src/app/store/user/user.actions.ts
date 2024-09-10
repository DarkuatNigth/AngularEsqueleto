import { Action } from "@ngrx/store";
import { Usuario,CorreoContraseñaCredenciales } from "./user.models";

export enum objTipos  {
  INIT = '[User] Init: Start',
  INIT_AUTHORIZED = '[User] Init: Authorized',
  INIT_UNAUTHORIZED = '[User] Init: Unauthorized',
  INIT_ERROR = '[User] Init: Error',

  SIGN_IN_EMAIL = '[Usuario] Login con email:Start',
  SIGN_IN_EMAIL_SUCCESS = '[Usuario] Login con email:Success',
  SIGN_IN_EMAIL_ERROR = '[Usuario] Login con email:Error',


  SIGN_UP_EMAIL = '[Usuario] Sign Up con email:Start',
  SIGN_UP_EMAIL_SUCCESS = '[Usuario] Sign Up con email:Success',
  SIGN_UP_EMAIL_ERROR = '[Usuario] Sign Up con email:Error',

  SIGN_OUT_EMAIL = '[Usuario] Sign Out con email:Start',
  SIGN_OUT_EMAIL_SUCCESS = '[Usuario] Sign Out con email:Success',
  SIGN_OUT_EMAIL_ERROR = '[Usuario] Sign Out con email:Error',
};
 //Init
 export class fnInit implements Action {
  readonly type = objTipos.INIT;
  constructor(){}
}

export class fnInitAutorizado implements Action {
  readonly type = objTipos.INIT_AUTHORIZED;
  constructor(public strUid: string, public objUsuario: Usuario | null){}
}

export class fnInitNoAuthorizado implements Action {
  readonly type = objTipos.INIT_UNAUTHORIZED;
  constructor(){}
}

export class fnInitError implements Action {
  readonly type = objTipos.INIT_ERROR;
  constructor(public strError: string){}
}

//Sign in o Login
export class fnSignInEmail implements Action{
  readonly type = objTipos.SIGN_IN_EMAIL;
  constructor(public objCredenciales: CorreoContraseñaCredenciales){}
}


export class fnSignInEmailSuccess implements Action{
  readonly type = objTipos.SIGN_IN_EMAIL_SUCCESS;
  constructor(public strUid: string, public objUsuario: Usuario|null){}
}

export class fnSignInEmailError implements Action{
  readonly type = objTipos.SIGN_IN_EMAIL_ERROR;
  constructor(public strError: string){}
}

//Sign in o Registro de Usuario
export class fnSignUpEmail implements Action{
  readonly type = objTipos.SIGN_UP_EMAIL;
  constructor(public objCredenciales: CorreoContraseñaCredenciales){}
}


export class fnSignUpEmailSuccess implements Action{
  readonly type = objTipos.SIGN_UP_EMAIL_SUCCESS;
  constructor(public strUid: string){}
}

export class fnSignUpEmailError implements Action{
  readonly type = objTipos.SIGN_UP_EMAIL_ERROR;
  constructor(public strError: string){}
}

//Sign in o Salir de sesion
export class fnSignOut implements Action{
  readonly type = objTipos.SIGN_OUT_EMAIL;
  constructor(){}
}


export class fnSignOutSuccess implements Action{
  readonly type = objTipos.SIGN_OUT_EMAIL_SUCCESS;
  constructor(){}
}

export class fnSignOutError implements Action{
  readonly type = objTipos.SIGN_OUT_EMAIL_ERROR;
  constructor(public strError: string){}
}

export type All = fnInit |
fnInitAutorizado |
fnInitNoAuthorizado |
fnInitError |
fnSignInEmail |
fnSignInEmailSuccess |
fnSignInEmailError |
fnSignUpEmail |
fnSignUpEmailSuccess |
fnSignUpEmailError |
fnSignOut |
fnSignOutSuccess |
fnSignOutError;
