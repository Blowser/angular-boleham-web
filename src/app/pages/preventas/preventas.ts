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
  cargando = true; // ⭐ Necesario para fallback

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {

    this.productosService.obtenerProductos().subscribe(data => {
      this.preventas = data.filter(p => p.categoria === 'Preventas');
      this.cargando = false;
    });

    // ⭐ Fallback automático si json-server está lento
    setTimeout(() => {
      if (this.cargando) {
        console.log('🔄 Fallback → recargando productos Preventas');

        this.productosService.obtenerProductos().subscribe(data => {
          this.preventas = data.filter(p => p.categoria === 'Preventas');
          this.cargando = false;

          console.log('🟦 Preventas → fallback completado:', this.preventas.length);
        });
      }
    }, 1500);
  }
}
