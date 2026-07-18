import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-detalles',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './producto-detalles.html',
  styleUrl: './producto-detalles.scss'
})
export class ProductoDetalles implements OnInit {

  producto!: Producto;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      this.productosService.obtenerProducto(id).subscribe(data => {
        this.producto = data;
      });
    });
  }
}
