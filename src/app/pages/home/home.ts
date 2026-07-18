import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';

import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    DecimalPipe
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class Home implements OnInit {

  preventas: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    console.log('🏠 Home ngOnInit → montado');

    this.productosService.obtenerProductos().subscribe((data: Producto[]) => {
      console.log('🏠 Home → productos recibidos:', data.length);

      this.preventas = data.filter((p: Producto) => p.categoria === 'Preventas');

      console.log('🏠 Home → preventas filtradas:', this.preventas.length);
    });
  }
}
