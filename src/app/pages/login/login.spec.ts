import { TestBed } from '@angular/core/testing';
import { Login } from './login';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

describe('Login Component - Formulario Reactivo', () => {

  let component: Login;

  beforeEach(() => {

    // mock alert()
    window.alert = () => {};

    // mock localStorage
    const store: Record<string, string> = {};

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return store[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      store[key] = value;
    });

    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete store[key];
    });

    TestBed.configureTestingModule({
      imports: [
        Login,
        ReactiveFormsModule,
        CommonModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: {} }
      ]
    });

    const fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería crear el formulario correctamente', () => {
    expect(component.formLogin).toBeTruthy();
  });

  it('debería tener los controles correo y clave', () => {
    const form = component.formLogin.controls;

    expect(form['correo']).toBeTruthy();
    expect(form['clave']).toBeTruthy();
  });

  it('debería validar email correctamente', () => {
    const correo = component.formLogin.get('correo');

    correo?.setValue('no-es-email');
    expect(correo?.valid).toBeFalsy();

    correo?.setValue('correo@ejemplo.com');
    expect(correo?.valid).toBeTruthy();
  });

  it('debería requerir contraseña', () => {
    const clave = component.formLogin.get('clave');

    clave?.setValue('');
    expect(clave?.valid).toBeFalsy();

    clave?.setValue('MiClave123');
    expect(clave?.valid).toBeTruthy();
  });

  it('debería marcar el formulario como inválido si falta un campo', () => {
    component.formLogin.get('correo')?.setValue('correo@ejemplo.com');
    component.formLogin.get('clave')?.setValue('');

    expect(component.formLogin.valid).toBeFalsy();
  });

  it('debería limpiar el formulario', () => {
    component.formLogin.get('correo')?.setValue('correo@ejemplo.com');
    component.limpiar();

    expect(component.formLogin.get('correo')?.value).toBe('');
  });

});
