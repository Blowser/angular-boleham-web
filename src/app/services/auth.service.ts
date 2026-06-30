import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../models/usuario.model';
import { SesionUsuario } from '../models/sesion-usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly keySesion = 'sesion';
  private readonly keyUsuarios = 'usuarios';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {

    // Solo ejecutar en navegador (SSR safe)
    if (isPlatformBrowser(this.platformId)) {

      // Obtener usuarios existentes
      const usuarios = JSON.parse(localStorage.getItem(this.keyUsuarios) || '[]') as Usuario[];

      // Verificar si ya existe un admin
      const existeAdmin = usuarios.some(u => u.rol === 'admin');

      // Crear admin por defecto si no existe
      if (!existeAdmin) {
        const admin: Usuario = {
          id: 1,
          nombreCompleto: 'Administrador del sistema',
          nombreUsuario: 'admin',
          correo: 'admin@admin.cl',
          clave: 'Admin123', // cumple validación
          fechaNacimiento: '1990-01-01',
          direccion: 'Oficina central',
          rol: 'admin'
        };

        usuarios.push(admin);
        localStorage.setItem(this.keyUsuarios, JSON.stringify(usuarios));

        console.log('✔ Admin precargado creado');
      }
    }
  }

  // -------------------------------------------------------------------------
  // SESIÓN
  // -------------------------------------------------------------------------

  get sesion(): SesionUsuario | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const data = localStorage.getItem(this.keySesion);
    return data ? JSON.parse(data) : null;
  }

  get autenticado(): boolean {
    return !!this.sesion;
  }

  get esCliente(): boolean {
    return this.sesion?.rol === 'cliente';
  }

  get esAdmin(): boolean {
    return this.sesion?.rol === 'admin';
  }

  // -------------------------------------------------------------------------
  // LOGIN
  // -------------------------------------------------------------------------

  login(correo: string, clave: string): { ok: boolean; mensaje: string } {

    if (!isPlatformBrowser(this.platformId)) {
      return { ok: false, mensaje: 'Error: localStorage no disponible.' };
    }

    const usuarios = JSON.parse(localStorage.getItem(this.keyUsuarios) || '[]') as Usuario[];

    const usuario = usuarios.find(u => u.correo === correo);

    if (!usuario || usuario.clave !== clave) {
      return { ok: false, mensaje: 'Correo o contraseña incorrectos.' };
    }

    const sesion: SesionUsuario = {
      id: usuario.id,
      nombreCompleto: usuario.nombreCompleto,
      correo: usuario.correo,
      rol: usuario.rol,
      logueado: true
    };

    localStorage.setItem(this.keySesion, JSON.stringify(sesion));

    return { ok: true, mensaje: `Bienvenido/a ${usuario.nombreUsuario}` };
  }

  // -------------------------------------------------------------------------
  // REGISTRO
  // -------------------------------------------------------------------------

  registrar(datos: {
    nombreCompleto: string;
    nombreUsuario: string;
    correo: string;
    clave: string;
    repetirClave: string;
    fechaNacimiento: string;
    direccion: string;
  }): { ok: boolean; mensaje: string } {

    if (!isPlatformBrowser(this.platformId)) {
      return { ok: false, mensaje: 'Error: localStorage no disponible.' };
    }

    const usuarios = JSON.parse(localStorage.getItem(this.keyUsuarios) || '[]') as Usuario[];

    if (datos.clave !== datos.repetirClave) {
      return { ok: false, mensaje: 'Las contraseñas deben coincidir.' };
    }

    if (usuarios.some(u => u.correo === datos.correo)) {
      return { ok: false, mensaje: 'Ya existe una cuenta con ese correo.' };
    }

    if (usuarios.some(u => u.nombreUsuario === datos.nombreUsuario)) {
      return { ok: false, mensaje: 'Ese nombre de usuario ya está en uso.' };
    }

    const nuevoUsuario: Usuario = {
      id: Date.now(),
      nombreCompleto: datos.nombreCompleto,
      nombreUsuario: datos.nombreUsuario,
      correo: datos.correo,
      clave: datos.clave,
      fechaNacimiento: datos.fechaNacimiento,
      direccion: datos.direccion,
      rol: 'cliente'
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem(this.keyUsuarios, JSON.stringify(usuarios));

    return { ok: true, mensaje: 'Registro exitoso. Ahora puedes iniciar sesión.' };
  }

  // -------------------------------------------------------------------------
  // LOGOUT
  // -------------------------------------------------------------------------

  cerrarSesion(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem(this.keySesion);
  }
}
