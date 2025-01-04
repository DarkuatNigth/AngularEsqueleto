import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import * as fromRoot from '@app/store';
import * as fromUser from '@app/store/user';
import * as fromProfileUser from '../../store/user';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit, OnDestroy {

  obsLstUsuario$ !: Observable<fromProfileUser.Usuario>;
  obsBlEsPerfilActual$ !: Observable<boolean>;
  constructor(
    private objRouter: ActivatedRoute,
    private objStore: Store<fromRoot.objEstado>
  ) { }

  ngOnInit(): void {
    this.obsLstUsuario$ = this.objStore.pipe(select(fromProfileUser.getUser)) as Observable<fromProfileUser.Usuario>;
    this.objRouter.params.subscribe((param: Params) => {
      const strId = param.id;
      this.objStore.dispatch(new fromProfileUser.fnRead(strId));
      this.obsBlEsPerfilActual$ = this.objStore.pipe(
        select(fromUser.getUsuario),
        map(user => user && user.strUid === strId)
      ) as Observable<boolean>;

    })
  }

  ngOnDestroy(): void {
    this.objStore.dispatch(new fromProfileUser.fnClear());
  }
}
