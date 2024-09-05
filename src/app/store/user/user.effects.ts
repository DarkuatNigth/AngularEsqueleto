import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from "firebase/app";
import { Observable, from, of } from "rxjs";
import { map,switchMap,catchError,take,tap,withLatestFrom } from "rxjs/operators";

import { environment } from "@src/environments/environment";

import { Usuario } from "./user.models";

import * as fromActions from './user.actions';

import { NotificationService } from "@app/services";

type objAcciones = fromActions.All;

@Injectable()
export class fnEffectsUsuario
{
  constructor(
    private objAcciones: Actions,
    private objAfAuth: AngularFireAuth,
    private objAfs: AngularFirestore,
    private objRouter: Router,
    private objNotificacion: NotificationService
  ){}

  fnSignUpEmail: Observable<objAcciones> = createEffect( ()=>
    this.objAcciones.pipe(
      ofType(fromActions.objTipos.SIGN_UP_EMAIL),
      map((objAccion : fromActions.fnSignUpEmail) => objAccion.objCredenciales),
      switchMap(objCredenciales =>
          from(this.objAfAuth.createUserWithEmailAndPassword(objCredenciales.strCorreo,objCredenciales.strPassword)
        ).pipe(
            tap(()=> {
              firebase.auth().currentUser?.sendEmailVerification(
                environment.actionCodeSettings
              );
            }),
            map((objEstadoSignUp)=> new fromActions.fnSignUpEmailSuccess(objEstadoSignUp.user ? objEstadoSignUp.user.uid :'' )),
            catchError( objError =>{
              this.objNotificacion.error(objError.message);
              return of(new fromActions.fnSignOutEmailError(objError.message))
            })
          )

      )
    )


  );

  fnSignInEmail: Observable<objAcciones> = createEffect( ()=>
    this.objAcciones.pipe(
      ofType(fromActions.objTipos.SIGN_IN_EMAIL),
      map((objAccion : fromActions.fnSignInEmail) => objAccion.objCredenciales),
      switchMap(objCredenciales =>
          from(this.objAfAuth.signInWithEmailAndPassword(objCredenciales.strCorreo,objCredenciales.strPassword)).pipe(
            switchMap(objEstadoSignIn =>
              this.objAfs.doc<Usuario>(`users/${objEstadoSignIn.user ? objEstadoSignIn.user.uid
              :''}`).valueChanges()
            .pipe(
              take(1),
              map(objUsuario => new fromActions.fnSignInEmailSuccess(objEstadoSignIn.user ? objEstadoSignIn.user.uid
                :'',objUsuario || null))
              )
            ),
            catchError( objError =>{
              this.objNotificacion.error(objError.message);
              return of(new fromActions.fnSignInEmailError(objError.message))
            })
          )

      )
    )


  );

  fnSignOutEmail: Observable<objAcciones> = createEffect( ()=>
    this.objAcciones.pipe(
      ofType(fromActions.objTipos.SIGN_OUT_EMAIL),
      switchMap(() =>
          from(this.objAfAuth.signOut()).pipe(
             map(() => new fromActions.fnSignOutEmailSuccess()),
            catchError( objError =>{
              this.objNotificacion.error(objError.message);
              return of(new fromActions.fnSignOutEmailError(objError.message))
            })
            )
      )
    )
  );
}
