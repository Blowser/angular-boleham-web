import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-preventas-json-server',
  standalone: true,
  imports: [CommonModule, FormsModule, DecimalPipe],
  templateUrl: './preventas-json-server.html',
  styleUrl: './preventas-json-server.scss'
})
export class PreventasJsonServer implements OnInit {

  productos: Producto[] = [];
  editando = false;

  formulario: Producto = {
    id: 0,
    nombre: '',
    categoria: 'Preventas',
    precio: 0,
    imagen: '',
    descripcion: ''
  };

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data.filter(p => p.categoria === 'Preventas');
    });
  }

  guardar(): void {
    if (!this.editando) {
      this.productosService.crearProducto(this.formulario).subscribe(() => {
        this.cargarProductos();
        this.limpiar();
      });
    } else {
      this.productosService.actualizarProducto(this.formulario.id, this.formulario).subscribe(() => {
        this.cargarProductos();
        this.limpiar();
        this.editando = false;
      });
    }
  }

  editar(p: Producto): void {
    this.formulario = { ...p };
    this.editando = true;
  }

  eliminar(id: number): void {
    if (!confirm('¿Eliminar preventa?')) return;

    this.productosService.eliminarProducto(id).subscribe(() => {
      this.cargarProductos();
    });
  }

  limpiar(): void {
    this.formulario = {
      id: 0,
      nombre: '',
      categoria: 'Preventas',
      precio: 0,
      imagen: '',
      descripcion: ''
    };
  }
}
