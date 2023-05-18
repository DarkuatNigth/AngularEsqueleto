import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerce-angular-app';

  constructor(private objFirestore: AngularFirestore){

  }

  ngOnInit(){
    console.log("Trayendo Datos desde Firebase :D");
    this.objFirestore.collection('test').snapshotChanges().subscribe(lstPersona => {
      console.log(lstPersona.map(objPersona=> objPersona.payload.doc.data()));
    })
  }

}
