import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-plushies-figuras',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plushies-figuras.html',
  styleUrl: './plushies-figuras.scss'
})
export class PlushiesFiguras implements OnInit {

  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data.filter(p => p.categoria === 'PlushiesFiguras');
    });
  }
}
