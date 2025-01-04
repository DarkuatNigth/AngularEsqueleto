import { AngularFireStorage } from "@angular/fire/storage";
import { Usuario } from "./user.models";
import * as  fromActions from './user.actions';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AngularFirestore } from "@angular/fire/firestore";
import {Observable, of } from "rxjs";
import { catchError, map,  switchMap, take } from "rxjs/operators";

type Action = fromActions.All;

@Injectable()
export class UserEffects{
  constructor(
    private objActions: Actions,
    private objAfs : AngularFirestore
  ){  }

  obsRead : Observable<Action> = createEffect(()=>
  this.objActions.pipe(
    ofType(fromActions.Types.READ),
    switchMap((action: fromActions.fnRead)=>
    this.objAfs.doc<Usuario>(`users/${action.strId}`).valueChanges().pipe(
      take(1),
      map((user:any)=> new fromActions.fnReadSuccess(user)),
      catchError(err => of(new fromActions.fnReadError(err.message)))
    )
  )
  ));

}
