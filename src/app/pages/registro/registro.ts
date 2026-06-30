import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// VALIDADORES PERSONALIZADOS
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

function contraseñasIguales(form: FormGroup) {
  const pass1 = form.get('clave')?.value;
  const pass2 = form.get('clave2')?.value;

  return pass1 === pass2 ? null : { contraseñasNoCoinciden: true };
}

function edadMinima() {
  return (control: any) => {
    const fecha = new Date(control.value);
    if (isNaN(fecha.getTime())) return null;

    const hoy = new Date();
    const edad = hoy.getFullYear() - fecha.getFullYear();

    return edad >= 13 ? null : { edadMinima: true };
  };
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss'
})
export class Registro {

  formRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    this.formRegistro = this.fb.group(
      {
        nombreCompleto: ['', Validators.required],
        nombreUsuario: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        fechaNacimiento: ['', [Validators.required, edadMinima()]],
        direccion: [''],
        clave: ['', [Validators.required, passwordSegura()]],
        clave2: ['', Validators.required]
      },
      {
        validators: contraseñasIguales
      }
    );
  }

  registrar() {
    if (this.formRegistro.invalid) {
      this.formRegistro.markAllAsTouched();
      return;
    }

    const datos = this.formRegistro.value;

    // Llamar al AuthService
    const resultado = this.auth.registrar({
      nombreCompleto: datos.nombreCompleto,
      nombreUsuario: datos.nombreUsuario,
      correo: datos.correo,
      clave: datos.clave,
      repetirClave: datos.clave2,
      fechaNacimiento: datos.fechaNacimiento,
      direccion: datos.direccion
    });

    if (!resultado.ok) {
      alert(resultado.mensaje);
      return;
    }

    alert(resultado.mensaje);

    // Redirigir al login
    this.router.navigate(['/login']);
  }

  limpiar() {
    this.formRegistro.reset();
  }
}
