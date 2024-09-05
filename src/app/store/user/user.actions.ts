import { Action } from "@ngrx/store";
import { Usuario,CorreoContraseñaCredenciales } from "./user.models";

export enum objTipos  {
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
export class fnSignOutEmail implements Action{
  readonly type = objTipos.SIGN_OUT_EMAIL;
  constructor(){}
}


export class fnSignOutEmailSuccess implements Action{
  readonly type = objTipos.SIGN_OUT_EMAIL_SUCCESS;
  constructor(){}
}

export class fnSignOutEmailError implements Action{
  readonly type = objTipos.SIGN_OUT_EMAIL_ERROR;
  constructor(public strError: string){}
}

export type All = fnSignInEmail |
fnSignInEmailSuccess |
fnSignInEmailError |
fnSignUpEmail |
fnSignUpEmailSuccess |
fnSignUpEmailError |
fnSignOutEmail |
fnSignOutEmailSuccess |
fnSignOutEmailError;
