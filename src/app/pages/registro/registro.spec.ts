import { Registro } from './registro';
import { FormBuilder } from '@angular/forms';

// Mock del AuthService
class MockAuthService {
  registrar() {
    return { ok: true, mensaje: 'Registrado correctamente' };
  }
}

// Mock del Router
class MockRouter {
  navigate(ruta: any) {}
}

describe('Registro (test de lógica interna)', () => {

  it('debería crear el formulario', () => {
    const fb = new FormBuilder();
    const auth = new MockAuthService();
    const router = new MockRouter();

    const component = new Registro(fb, auth as any, router as any);

    expect(component.formRegistro).toBeTruthy();
  });

  it('debería validar que el formulario inicia inválido', () => {
    const fb = new FormBuilder();
    const auth = new MockAuthService();
    const router = new MockRouter();

    const component = new Registro(fb, auth as any, router as any);

    expect(component.formRegistro.valid).toBeFalsy();
  });

});
