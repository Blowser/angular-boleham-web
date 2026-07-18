import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-comics-libros',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './comics-libros.html',
  styleUrl: './comics-libros.scss'
})
export class ComicsLibros implements OnInit {

  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
  console.log('🟦 ComicsLibros ngOnInit → componente montado');

  this.productosService.obtenerProductos().subscribe(data => {
    console.log('🟦 Categorías disponibles:', [...new Set(data.map(p => p.categoria))]);

    this.productos = data.filter(p => p.categoria?.trim() === 'ComicsLibros');

    console.log('🟦 ComicsLibros → productos filtrados:', this.productos.length);
  });
}}
