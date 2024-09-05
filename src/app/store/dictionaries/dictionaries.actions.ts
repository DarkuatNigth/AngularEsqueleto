import { Action } from "@ngrx/store";
import { Diccionarios } from "./dictionaries.models";

export enum Types {
  READ = '[Dictionarios] Read: Start',
  READ_SUCCESS = '[Dictionarios] Read: Success',
  READ_ERROR = '[Dictionarios] Read: Error'
}

export class objRead implements Action{
  readonly type = Types.READ;
  constructor() {}
}

export class objReadSuccess implements Action {
  readonly type= Types.READ_SUCCESS;
  constructor(public objDiccionario: Diccionarios){}
}

export class objReadError implements Action{
  readonly type = Types.READ_ERROR;
  constructor(public strError:string) {}

}


export type All = objRead | objReadSuccess | objReadError;
