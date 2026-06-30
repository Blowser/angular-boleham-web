export type RolUsuario = 'cliente' | 'admin';

export interface Usuario {
  id: number;
  nombreCompleto: string;
  nombreUsuario: string;
  correo: string;
  fechaNacimiento: string; // formato YYYY-MM-DD
  direccion?: string;      // opcional
  clave: string;
  rol: RolUsuario;
}
