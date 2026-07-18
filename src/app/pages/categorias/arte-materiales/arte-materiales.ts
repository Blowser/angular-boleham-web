import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-arte-materiales',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './arte-materiales.html',
  styleUrl: './arte-materiales.scss'
})
export class ArteMateriales implements OnInit {

  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data.filter(p => p.categoria === 'ArteMateriales');
    });
  }
}
