import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class WishlistService {

  private items: Producto[] = [];

  constructor() {
    const guardado = localStorage.getItem('wishlist');
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
    localStorage.setItem('wishlist', JSON.stringify(this.items));
  }
}
