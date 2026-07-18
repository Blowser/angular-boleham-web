import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accesorios.html',
  styleUrl: './accesorios.scss'
})
export class Accesorios implements OnInit {

  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data.filter(p => p.categoria === 'Accesorios');
    });
  }
}
