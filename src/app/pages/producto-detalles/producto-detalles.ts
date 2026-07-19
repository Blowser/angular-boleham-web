import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { CarritoService } from '../../services/carrito.service';
import { WishlistService } from '../../services/wishlist.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-producto-detalles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-detalles.html',
  styleUrl: './producto-detalles.scss'
})
export class ProductoDetalles implements OnInit {

  producto!: Producto;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private carrito: CarritoService,
    private wishlist: WishlistService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarProducto();
  }

  cargarProducto(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.producto = data.find(p => p.id === this.id)!;
    });
  }

  agregarCarrito(): void {
    if (!this.auth.estaLogueado()) {
      alert('Debes iniciar sesión para agregar al carrito.');
      return;
    }
    this.carrito.agregar(this.producto);
  }

  agregarWishlist(): void {
    if (!this.auth.estaLogueado()) {
      alert('Debes iniciar sesión para usar la wishlist.');
      return;
    }
    this.wishlist.agregar(this.producto);
  }
}
