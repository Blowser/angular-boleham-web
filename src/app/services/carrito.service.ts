import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private items: Producto[] = [];
  private storageKey = 'carrito_guest';

  constructor(private auth: AuthService) {

    const usuario = this.auth.obtenerUsuarioActual();

    // Clave dinámica por usuario
    this.storageKey = usuario
      ? `carrito_${usuario.id}`
      : 'carrito_guest';

    // Cargar carrito del usuario
    const guardado = localStorage.getItem(this.storageKey);
    if (guardado) {
      this.items = JSON.parse(guardado);
    }
  }

  obtenerItems(): Producto[] {
    return this.items;
  }

  agregar(producto: Producto): void {
    this.items.push(producto);
    this.guardar();
  }

  eliminar(id: number): void {
    this.items = this.items.filter(p => p.id !== id);
    this.guardar();
  }

  vaciar(): void {
    this.items = [];
    this.guardar();
  }

  total(): number {
    return this.items.reduce((acc, p) => acc + p.precio, 0);
  }

  private guardar(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
}
