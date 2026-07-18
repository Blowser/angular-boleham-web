import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';
import { CarritoService } from '../../../services/carrito.service';
import { WishlistService } from '../../../services/wishlist.service';

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
    private wishlist: WishlistService
  ) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data.filter(p => p.categoria === 'PlushiesFiguras');
    });
  }

  agregarAlCarrito(producto: Producto): void {
    this.carrito.agregar(producto);
    console.log('🛒 Producto agregado:', producto.nombre);
  }

  agregarWishlist(producto: Producto): void {
    this.wishlist.agregar(producto);
    console.log('💖 Wishlist → agregado:', producto.nombre);
  }
}
