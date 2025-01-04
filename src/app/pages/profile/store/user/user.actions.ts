import { Action } from "@ngrx/store";
import { Usuario } from "./user.models";

export enum Types {
  READ = '[Profile] [User] Read: Start',
  READ_SUCCESS = '[Profile] [User] Read: Success',
  READ_ERROR = '[Profile] [User] Read: Error',
  CLEAR = '[Profile] [User] Read: Clear',
}


export class fnRead implements Action{
  readonly type = Types.READ;
  constructor(public strId: string){}
}


export class fnReadSuccess implements Action{
  readonly type = Types.READ_SUCCESS;
  constructor(public objUsuario: Usuario){}
}


export class fnReadError implements Action{
  readonly type = Types.READ_ERROR;
  constructor(public strError: string){}
}


export class fnClear implements Action{
  readonly type = Types.CLEAR;
  constructor(){}
}

export  type All = fnRead
| fnReadSuccess
| fnReadError
| fnClear;
