import { Action } from "@ngrx/store";
import { objProfileForm } from './form.models';

export enum Types {
  SET = '[Profile] [Form] set ',
  UPDATE = '[Profile] [Form] Update ',
  CLEAR = '[Profile] [Form] Clear '
}

export class fnSet implements Action {
  readonly type = Types.SET;
  constructor(public objForm: objProfileForm){}
}


export class fnUpdate implements Action {
  readonly type = Types.UPDATE;
  constructor(public objChanges: Partial<objProfileForm>){}
}


export class fnClear implements Action {
  readonly type = Types.CLEAR;
  constructor(){}
}

export type All = fnSet
| fnUpdate
| fnClear;

