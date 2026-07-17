import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Proximamente } from './pages/proximamente/proximamente';

import { ComicsLibros } from './pages/categorias/comics-libros/comics-libros';
import { ArteMateriales } from './pages/categorias/arte-materiales/arte-materiales';
import { PlushiesFiguras } from './pages/categorias/plushies-figuras/plushies-figuras';
import { Accesorios } from './pages/categorias/accesorios/accesorios';

import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Recuperar } from './pages/recuperar/recuperar';

import { Admin } from './pages/admin/admin';
import { MiPerfil } from './pages/mi-perfil/mi-perfil';
import { ModificarPerfil } from './pages/modificar-perfil/modificar-perfil';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'proximamente', component: Proximamente },

  { path: 'categorias/comics-libros', component: ComicsLibros },
  { path: 'categorias/arte-materiales', component: ArteMateriales },
  { path: 'categorias/plushies-figuras', component: PlushiesFiguras },
  { path: 'categorias/accesorios', component: Accesorios },

  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'recuperar', component: Recuperar },

  // ⭐ RUTA PRIVADA: SOLO ADMIN
  {
    path: 'admin',
    component: Admin,
    canActivate: [AuthGuard],
    data: { rol: 'admin' }
  },

  // ⭐ RUTA PRIVADA: SOLO CLIENTE
  {
    path: 'mi-perfil',
    component: MiPerfil,
    canActivate: [AuthGuard],
    data: { rol: 'cliente' }
  },

  {
    path: 'modificar-perfil',
    component: ModificarPerfil,
    canActivate: [AuthGuard],
    data: { rol: 'cliente' }
  },

  // ⭐ Preventas es pública
  {
    path: 'preventas',
    loadComponent: () => import('./pages/preventas/preventas').then(m => m.Preventas)
  }
];
