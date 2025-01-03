import { Empleado, Reclutador } from "./roles";
import firebase from "firebase";
export * from './roles';

export interface Usuario{
  strUid?: string ;
  strNombre?: string | null;
  strFotoURL?: string | null;
  strPais: string | null;
  strAcerca?: string | null;
  strRoleId?: string | null;
  objRole?: Empleado | Reclutador | null | any;
  dtFechaCrea?: firebase.firestore.FieldValue ;
  dtFechaActualiza?: firebase.firestore.FieldValue ;
}
