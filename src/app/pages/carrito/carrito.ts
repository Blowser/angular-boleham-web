import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { CarritoService } from '../../services/carrito.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss'
})
export class Carrito {

  constructor(public carrito: CarritoService) {}

  obtenerItems(): Producto[] {
    return this.carrito.obtenerItems();
  }

  eliminar(id: number): void {
    this.carrito.eliminar(id);
  }

  vaciar(): void {
    this.carrito.vaciar();
  }

  total(): number {
    return this.carrito.total();
  }
}
