import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin {

  usuarios: Usuario[] = [];
  cantidadUsuarios = 0;

  constructor() {

    const data = localStorage.getItem('usuarios');
    this.usuarios = data ? JSON.parse(data) : [];

    this.cantidadUsuarios = this.usuarios.length;
  }

  cerrarSesion() {
    localStorage.removeItem('sesion');
    location.href = '/';
  }
}
