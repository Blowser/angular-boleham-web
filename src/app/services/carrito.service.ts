import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class CarritoService {

  private items: Producto[] = [];

  constructor() {
    // Cargar desde localStorage si existe
    const guardado = localStorage.getItem('carrito');
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
    localStorage.setItem('carrito', JSON.stringify(this.items));
  }
}
