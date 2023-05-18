import { Empleado, Reclutador } from "./roles";
import firebase from "firebase";

export interface Usuario{
  strUid: string;
  strNombre: string;
  strFotoURL: string;
  strPais: string;
  strAcerca: string;
  strRoleId: string;
  objRole: Empleado | Reclutador;
  dtFechaCrea: firebase.firestore.FieldValue;
  dtFechaActualiza?: firebase.firestore.FieldValue;
}
