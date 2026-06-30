import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

// VALIDACIÓN DE CONTRASEÑA SEGURA
function passwordSegura() {
  return (control: any) => {
    const value = control.value || '';
    const tieneMayuscula = /[A-Z]/.test(value);
    const tieneNumero = /[0-9]/.test(value);
    const largoValido = value.length >= 6 && value.length <= 18;

    return tieneMayuscula && tieneNumero && largoValido
      ? null
      : { passwordSegura: true };
  };
}

// VALIDACIÓN DE CONTRASEÑAS IGUALES
function contraseñasIguales(form: FormGroup) {
  const pass1 = form.get('clave')?.value;
  const pass2 = form.get('clave2')?.value;

  return pass1 === pass2 ? null : { contraseñasNoCoinciden: true };
}

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './recuperar.html',
  styleUrl: './recuperar.scss'
})
export class Recuperar {

  formRecuperar: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {

    this.formRecuperar = this.fb.group(
      {
        correo: ['', [Validators.required, Validators.email]],
        clave: ['', [Validators.required, passwordSegura()]],
        clave2: ['', Validators.required]
      },
      {
        validators: contraseñasIguales
      }
    );
  }

  actualizar() {
    if (this.formRecuperar.invalid) {
      this.formRecuperar.markAllAsTouched();
      return;
    }

    const { correo, clave } = this.formRecuperar.value;

    // 1️⃣ Obtener usuarios
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // 2️⃣ Buscar usuario por correo
    const index = usuarios.findIndex((u: any) => u.correo === correo);

    if (index === -1) {
      alert('No existe una cuenta con ese correo.');
      return;
    }

    // 3️⃣ Actualizar contraseña
    usuarios[index].clave = clave;

    // 4️⃣ Guardar cambios
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // 5️⃣ Si el usuario está logueado, actualizar sesión también
    const sesion = this.auth.sesion;
    if (sesion && sesion.correo === correo) {
      localStorage.setItem('sesion', JSON.stringify({
        ...sesion,
        // la sesión no guarda clave, pero igual la mantenemos coherente
      }));
    }

    alert('Contraseña actualizada correctamente 🔐');

    // 6️⃣ Redirigir al login
    this.router.navigate(['/login']);
  }

  limpiar() {
    this.formRecuperar.reset();
  }
}
