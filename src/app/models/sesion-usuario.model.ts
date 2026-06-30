import { RolUsuario } from './usuario.model';

export interface SesionUsuario {
  id: number;
  nombreCompleto: string;
  correo: string;
  rol: RolUsuario;
  logueado: true;
}
