import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';
import * as fromUsuario from './store/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-angular-app';
  blEnSesion$ !: Observable<boolean>;

  constructor(private objStore: Store<fromRoot.objEstado>){

  }

  ngOnInit(){
    this.blEnSesion$ = this.objStore.pipe(select(fromUsuario.getEsAutorizado));
    this.objStore.dispatch(new fromUsuario.fnInit())
    this.objStore.dispatch(new fromDictionaries.objRead());
  }

  onSignOut(): void {
    this.objStore.dispatch(new fromUsuario.fnSignOut());
  }

}
