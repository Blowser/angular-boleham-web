import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';
import { CarritoService } from '../../../services/carrito.service';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-comics-libros',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './comics-libros.html',
  styleUrl: './comics-libros.scss'
})
export class ComicsLibros implements OnInit {

  productos: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private carrito: CarritoService,
    private wishlist: WishlistService,
    public auth: AuthService   // ⭐ NECESARIO PARA BLOQUEAR
  ) {}

  ngOnInit(): void {
    console.log('🟦 ComicsLibros ngOnInit → componente montado');

    this.productosService.obtenerProductos().subscribe(data => {
      console.log('🟦 Categorías disponibles:', [...new Set(data.map(p => p.categoria))]);

      this.productos = data.filter(p => p.categoria?.trim() === 'ComicsLibros');

      console.log('🟦 ComicsLibros → productos filtrados:', this.productos.length);
    });
  }

  agregarAlCarrito(producto: Producto): void {
    // ⭐ BLOQUEO PARA INVITADOS
    if (!this.auth.estaLogueado()) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }

    this.carrito.agregar(producto);
    console.log('🛒 Producto agregado:', producto.nombre);
  }
  
  agregarWishlist(producto: Producto): void {
    // ⭐ BLOQUEO PARA INVITADOS
    if (!this.auth.estaLogueado()) {
      alert('Debes iniciar sesión para usar la wishlist.');
      return;
    }

    this.wishlist.agregar(producto);
    console.log('💖 Wishlist → agregado:', producto.nombre);
  }

}
