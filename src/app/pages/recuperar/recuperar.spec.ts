import { TestBed } from '@angular/core/testing';
import { Recuperar } from './recuperar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('Recuperar Component - Formulario Reactivo', () => {

  let component: Recuperar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Recuperar, ReactiveFormsModule, CommonModule]
    });

    const fixture = TestBed.createComponent(Recuperar);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería crear el formulario correctamente', () => {
    expect(component.formRecuperar).toBeTruthy();
  });

  it('debería tener los controles correo, clave y clave2', () => {
    const form = component.formRecuperar.controls;

    expect(form['correo']).toBeTruthy();
    expect(form['clave']).toBeTruthy();
    expect(form['clave2']).toBeTruthy();
  });

  it('debería validar email correctamente', () => {
    const correo = component.formRecuperar.get('correo');

    correo?.setValue('no-es-email');
    expect(correo?.valid).toBeFalsy();

    correo?.setValue('correo@ejemplo.com');
    expect(correo?.valid).toBeTruthy();
  });

  it('debería validar contraseña segura', () => {
    const clave = component.formRecuperar.get('clave');

    clave?.setValue('abc'); // inválida
    expect(clave?.valid).toBeFalsy();

    clave?.setValue('Abc123'); // válida
    expect(clave?.valid).toBeTruthy();
  });

  it('debería validar que las contraseñas coinciden', () => {
    const form = component.formRecuperar;

    form.get('clave')?.setValue('Abc123');
    form.get('clave2')?.setValue('Abc123');
    expect(form.errors).toBeNull();

    form.get('clave2')?.setValue('otraClave');
    expect(form.errors?.['contraseñasNoCoinciden']).toBeTruthy();
  });

  it('debería marcar el formulario como inválido si falta un campo', () => {
    component.formRecuperar.get('correo')?.setValue('correo@ejemplo.com');
    component.formRecuperar.get('clave')?.setValue('Abc123');
    component.formRecuperar.get('clave2')?.setValue('');

    expect(component.formRecuperar.valid).toBeFalsy();
  });

  it('debería limpiar el formulario', () => {
    component.formRecuperar.get('correo')?.setValue('correo@ejemplo.com');
    component.limpiar();

    expect(component.formRecuperar.get('correo')?.value).toBe('');
  });

});
