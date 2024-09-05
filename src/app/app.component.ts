import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './store';
import * as fromDictionaries from './store/dictionaries';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-angular-app';

  constructor(private objStore: Store<fromRoot.objEstado>){

  }

  ngOnInit(){
    this.objStore.dispatch(new fromDictionaries.objRead());
  }

}
