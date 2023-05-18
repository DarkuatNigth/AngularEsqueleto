import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './components';

@Injectable()
export class NotificationService {

  constructor(private objSnackBar: MatSnackBar) {
   }

  error(strMensaje:string):void{
    this.objSnackBar.openFromComponent(NotificationComponent,
      {
        duration:3000,
        data:{ strMensaje},
        panelClass:['mat-snackbar_error']
      }
    );
  }
  success(strMensaje: string):void{
    this.objSnackBar.openFromComponent(NotificationComponent,
      {
        duration:3000,
        data:{ strMensaje},
        panelClass:['mat-snackbar_success']
      }
    );
  }
}
