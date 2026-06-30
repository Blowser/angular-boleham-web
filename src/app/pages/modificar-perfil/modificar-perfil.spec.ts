import { render } from '@testing-library/angular';
import { ModificarPerfil } from './modificar-perfil';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

class MockAuthService {
  sesion = {
    id: 1,
    nombreCompleto: 'Nacho',
    nombreUsuario: 'nacho123',
    correo: 'nacho@ejemplo.com',
    direccion: 'Mi casa'
  };
}

describe('ModificarPerfil Component', () => {

  beforeEach(() => {
    localStorage.setItem('usuarios', JSON.stringify([
      {
        id: 1,
        nombreCompleto: 'Nacho',
        nombreUsuario: 'nacho123',
        correo: 'nacho@ejemplo.com',
        direccion: 'Mi casa'
      }
    ]));
  });

  it('debería crear el componente', async () => {
    const { fixture } = await render(ModificarPerfil, {
      imports: [ReactiveFormsModule, CommonModule],
      providers: [
        { provide: MockAuthService, useClass: MockAuthService },
        { provide: 'AuthService', useClass: MockAuthService }
      ]
    });

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('debería crear el formulario correctamente', async () => {
    const { fixture } = await render(ModificarPerfil, {
      imports: [ReactiveFormsModule, CommonModule],
      providers: [
        { provide: MockAuthService, useClass: MockAuthService },
        { provide: 'AuthService', useClass: MockAuthService }
      ]
    });

    expect(fixture.componentInstance.formPerfil).toBeTruthy();
  });

});
