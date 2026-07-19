import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';
import { CarritoService } from '../../../services/carrito.service';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accesorios.html',
  styleUrl: './accesorios.scss'
})
export class Accesorios implements OnInit {

  productos: Producto[] = [];
  cargando = true; // ⭐ Necesario para fallback

  constructor(
    private productosService: ProductosService,
    private carrito: CarritoService,
    private wishlist: WishlistService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {

    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data.filter(p => p.categoria === 'Accesorios');
      this.cargando = false;
    });

    // ⭐ Fallback automático si json-server está lento
    setTimeout(() => {
      if (this.cargando) {
        console.log('🔄 Fallback → recargando productos Accesorios');

        this.productosService.obtenerProductos().subscribe(data => {
          this.productos = data.filter(p => p.categoria === 'Accesorios');
          this.cargando = false;

          console.log('🟦 Accesorios → fallback completado:', this.productos.length);
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
    console.log('🛒 Producto agregado:', producto.nombre);
  }

  agregarWishlist(producto: Producto): void {
    if (!this.auth.estaLogueado()) {
      alert('Debes iniciar sesión para usar la wishlist.');
      return;
    }

    this.wishlist.agregar(producto);
    console.log('💖 Wishlist → agregado:', producto.nombre);
  }
}
