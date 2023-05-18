import firebase from "firebase";
export interface Trabajo{
  strTitulo: string;
  nbSalario: number;
  dtFechaCrea: firebase.firestore.FieldValue;
  dtFechaActualiza?: firebase.firestore.FieldValue;
}
