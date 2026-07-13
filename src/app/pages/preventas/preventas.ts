import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-preventas',
  standalone: true,
  imports: [CommonModule, RouterLink, DecimalPipe],
  templateUrl: './preventas.html',
  styleUrl: './preventas.scss'
})
export class Preventas implements OnInit {

  preventas: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.preventas = data.filter(p => p.categoria === 'Preventas');
    });
  }
}
