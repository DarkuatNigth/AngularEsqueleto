import { Usuario } from '@app/models/backend';
export { Usuario, Reclutador, Empleado } from '@app/models/backend/user';

export interface CorreoContraseñaCredenciales{
  strCorreo:string;
  strPassword:string;
}

export type UserCreateRequest = Omit<Usuario, 'uid'| 'email'| 'created'>;
