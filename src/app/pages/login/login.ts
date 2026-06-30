import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {

    // Formulario reactivo
    this.formLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });
  }

  iniciarSesion() {
    // Validación del formulario
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const { correo, clave } = this.formLogin.value;

    // Llamar al AuthService
    const resultado = this.auth.login(correo, clave);

    if (!resultado.ok) {
      alert(resultado.mensaje);
      return;
    }

    alert(resultado.mensaje);

    // Redirigir según rol
    const sesion = this.auth.sesion;

    if (sesion?.rol === 'admin') {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/mi-perfil']);
    }
  }

  limpiar() {
    this.formLogin.reset();
  }
}
