import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Usuario } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mi-perfil.html',
  styleUrl: './mi-perfil.scss'
})
export class MiPerfil {

  usuario: Usuario | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private auth: AuthService
  ) {

    if (isPlatformBrowser(this.platformId)) {

      // Obtener sesión
      const sesion = this.auth.sesion;

      if (!sesion) return;

      //Obtener lista de usuarios
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]') as Usuario[];

      //Buscar usuario real
      this.usuario = usuarios.find(u => u.id === sesion.id) || null;
    }
  }

  cerrarSesion() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('sesion');
    }
    location.href = '/';
  }
}
