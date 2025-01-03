import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import { select, Store } from '@ngrx/store';
import { filter, Observable, take } from 'rxjs';

@Injectable()
export class UserResolver implements Resolve<fromUser.Usuario>{
   constructor(private objStore: Store<fromRoot.objEstado>){}
   resolve(): Observable<fromUser.Usuario>{
    return this.objStore
    .pipe(select(fromUser.getUsuario), filter((user: any) => !!user),take(1));
   }
}
