import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {

  // Leer el rol requerido desde la ruta
  const requerido = route.data['rol'] as 'auth' | 'cliente' | 'admin' | undefined;

  // Usar el getter del servicio
  const sesion = this.auth.sesion;

  // Rutas que solo requieren estar logueado
  if (!requerido || requerido === 'auth') {
    return sesion ? true : this.router.createUrlTree(['/login']);
  }

  // Si la ruta requiere rol, primero verificar sesión
  if (!sesion) {
    return this.router.createUrlTree(['/login']);
  }

  // Verificar rol cliente
  if (requerido === 'cliente' && sesion.rol !== 'cliente') {
    return this.router.createUrlTree(['/']);
  }

  // Verificar rol admin
  if (requerido === 'admin' && sesion.rol !== 'admin') {
    return this.router.createUrlTree(['/']);
  }

  return true;
  }
}
