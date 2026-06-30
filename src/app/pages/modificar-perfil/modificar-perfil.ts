import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-perfil',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './modificar-perfil.html',
  styleUrl: './modificar-perfil.scss'
})
export class ModificarPerfil {

  formPerfil!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {

    //Obtener sesión activa
    const sesion = this.auth.sesion;

    if (!sesion) {
      alert('No hay sesión activa');
      return;
    }

    //Obtener lista de usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]') as Usuario[];

    //Buscar usuario activo
    const usuario = usuarios.find(u => u.id === sesion.id);

    if (!usuario) {
      alert('Usuario no encontrado');
      return;
    }

    //Crear formulario con datos reales
    this.formPerfil = this.fb.group({
      nombreCompleto: [usuario.nombreCompleto, Validators.required],
      nombreUsuario: [usuario.nombreUsuario, Validators.required],
      correo: [usuario.correo, [Validators.required, Validators.email]],
      direccion: [usuario.direccion || '']
    });
  }

guardarCambios() {
  if (this.formPerfil.invalid) {
    this.formPerfil.markAllAsTouched();
    return;
  }

  const sesion = this.auth.sesion;
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]') as Usuario[];

  const index = usuarios.findIndex(u => u.id === sesion?.id);

  if (index === -1) {
    alert('Error: usuario no encontrado');
    return;
  }

  // Actualizar usuario en la lista
  usuarios[index] = {
    ...usuarios[index],
    ...this.formPerfil.value
  };

  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Actualizar sesión también
  localStorage.setItem('sesion', JSON.stringify({
    ...sesion,
    ...this.formPerfil.value
  }));

  alert('Perfil actualizado correctamente ✨');

  // 🔥 Redirigir automáticamente
  this.router.navigate(['/mi-perfil']);
}

}

