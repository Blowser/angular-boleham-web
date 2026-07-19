import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class WishlistService {

  private items: Producto[] = [];
  private storageKey = 'wishlist_guest';

  constructor(private auth: AuthService) {

    const usuario = this.auth.obtenerUsuarioActual();

    // Clave dinámica por usuario
    this.storageKey = usuario
      ? `wishlist_${usuario.id}`
      : 'wishlist_guest';

    // Cargar wishlist del usuario
    const guardado = localStorage.getItem(this.storageKey);
    if (guardado) {
      this.items = JSON.parse(guardado);
    }
  }

  obtenerItems(): Producto[] {
    return this.items;
  }

  agregar(producto: Producto): void {
    // evitar duplicados
    if (!this.items.find(p => p.id === producto.id)) {
      this.items.push(producto);
      this.guardar();
    }
  }

  eliminar(id: number): void {
    this.items = this.items.filter(p => p.id !== id);
    this.guardar();
  }

  private guardar(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }
}
