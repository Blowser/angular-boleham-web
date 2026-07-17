import { RolUsuario } from './usuario.model';

export interface SesionUsuario {
  id: number;
  nombreCompleto: string;
  nombreUsuario: string;   // ← AGREGAR ESTO
  correo: string;
  rol: RolUsuario;
  logueado: true;
}
