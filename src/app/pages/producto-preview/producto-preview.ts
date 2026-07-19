import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-producto-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './producto-preview.html',
  styleUrl: './producto-preview.scss'
})
export class ProductoPreview implements OnInit {

  producto!: Producto;

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productosService.obtenerProductos().subscribe(data => {
      this.producto = data.find(p => p.id === id)!;
    });
  }
}
