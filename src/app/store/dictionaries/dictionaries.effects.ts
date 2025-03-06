import { Injectable } from "@angular/core";
import {  Actions, ofType, createEffect } from "@ngrx/effects";
import { AngularFirestore, DocumentChangeAction } from "@angular/fire/firestore";

import { Observable, of, zip } from 'rxjs';
import { map, switchMap, catchError, take } from 'rxjs/operators';

import { Diccionarios, objDiccionario, Item, ControlItem } from "./dictionaries.models";

import * as fromActions from './dictionaries.actions';

import * as lstJsonPaises from '@src/assets/countries.json';

type objAccion = fromActions.All;
const objDocumentoItem = (x: DocumentChangeAction<any>): Item=>{
  const objData = x.payload.doc.data();
  return {
    strId: x.payload.doc.id,
    ...objData,
  };
};

const objControlItem = (x:Item): ControlItem =>({
  objValor: x.strId,
  strLabel: x.strName,
  objIcon: x.objIcon
});

const agregarDiccionario = (lstItem: Item[]) : objDiccionario => ({
  lstItem,
  lstControlItem: [...lstItem].map(x=> objControlItem(x)),
});

@Injectable()
export class DiccionariosEffects{

constructor(
  private objAcccion : Actions, private objAfs: AngularFirestore
){}

  objLectura: Observable<objAccion> = createEffect(()=>
    this.objAcccion.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() => {
        return zip(
          this.objAfs.collection('roles').snapshotChanges().pipe(
            take(1),
            map( objItem => objItem.map( x=> objDocumentoItem(x))),
          ),
          this.objAfs.collection('habilidades').snapshotChanges().pipe(
            take(1),
            map( objItem => objItem.map( x=> objDocumentoItem(x))),
          ),
          this.objAfs.collection('calificaciones').snapshotChanges().pipe(
            take(1),
            map( objItem => objItem.map( x=> objDocumentoItem(x))),
          ),
          this.objAfs.collection('especializacion').snapshotChanges().pipe(
            take(1),
            map( objItem => objItem.map( x=> objDocumentoItem(x))),
          ),
          of((lstJsonPaises as any).default.map((pais : any) =>({
            strId:pais.code.toUpperCase(),
            strName: pais.name,
            objIcon: {
              strSrc: null,
              strCssClass: 'fflag fflag-'+pais.code.toUpperCase()
              }
          }))
        )
        ).pipe(
          map(([roles, habilidades,calificaciones, especializacion, pais ]) =>{
            let objDiccionario : Diccionarios ={
              lstRol: agregarDiccionario(roles),
              lstHabilidades:agregarDiccionario(habilidades),
              objEspecializacion:agregarDiccionario(especializacion),
              lstCalificaciones:agregarDiccionario(calificaciones),
              lstPaises:agregarDiccionario(pais)
            };
            console.log('objlLectura',objDiccionario);
            return new fromActions.objReadSuccess(objDiccionario);
          }),
          catchError(strError => of(new fromActions.objReadError(strError.message)))
        )
      })
    )
  )

}
