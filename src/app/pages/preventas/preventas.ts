import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-preventas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './preventas.html',
  styleUrl: './preventas.scss'
})
export class Preventas implements OnInit {

  productos: Producto[] = [];
  cargando = true;

  constructor(
    private productosService: ProductosService,
    private carrito: CarritoService,
    private wishlist: WishlistService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    console.log('🟦 Preventas ngOnInit → componente montado');

    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data.filter(p => p.categoria?.trim() === 'Preventas');
      this.cargando = false;

      console.log('🟦 Preventas → productos filtrados:', this.productos.length);
    });

    // ⭐ Fallback automático
    setTimeout(() => {
      if (this.cargando) {
        console.log('🔄 Fallback → recargando productos Preventas');

        this.productosService.obtenerProductos().subscribe(data => {
          this.productos = data.filter(p => p.categoria?.trim() === 'Preventas');
          this.cargando = false;

          console.log('🟦 Preventas → fallback completado:', this.productos.length);
        });
      }
    }, 1500);
  }

  agregarAlCarrito(producto: Producto): void {
    if (!this.auth.estaLogueado()) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }
    this.carrito.agregar(producto);
  }

  agregarWishlist(producto: Producto): void {
    if (!this.auth.estaLogueado()) {
      alert('Debes iniciar sesión para usar la wishlist.');
      return;
    }
    this.wishlist.agregar(producto);
  }
}
