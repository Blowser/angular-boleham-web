import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';
import { CarritoService } from '../../../services/carrito.service';
import { WishlistService } from '../../../services/wishlist.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-plushies-figuras',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plushies-figuras.html',
  styleUrl: './plushies-figuras.scss'
})
export class PlushiesFiguras implements OnInit {

  productos: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    private carrito: CarritoService,
    private wishlist: WishlistService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data.filter(p => p.categoria === 'PlushiesFiguras');
    });
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
