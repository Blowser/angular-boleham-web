import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Usuario } from '../../models/usuario.model';
import { Producto } from '../../models/producto.model';
import { ProductosService } from '../../services/productos.service';

// Pipe para filtrar categorías
import { CategoryFilterPipe } from '../../pipes/filtrar-categoria';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, CategoryFilterPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {

  // -------------------------
  // USUARIOS
  // -------------------------
  usuarios: Usuario[] = [];
  cantidadUsuarios = 0;

  // -------------------------
  // PRODUCTOS (CRUD REAL)
  // -------------------------
  productos: Producto[] = [];
  editandoProducto = false;

  // FILTRO POR CATEGORÍA
  filtroCategoria = '';

  formularioProducto: Producto = {
    id: 0,
    nombre: '',
    categoria: '',
    precio: 0,
    imagen: '',
    descripcion: ''
  };

  constructor(private productosService: ProductosService) {

    // Usuarios desde localStorage
    const data = localStorage.getItem('usuarios');
    this.usuarios = data ? JSON.parse(data) : [];
    this.cantidadUsuarios = this.usuarios.length;
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  // -------------------------
  // CRUD REAL DE PRODUCTOS
  // -------------------------

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe(data => {
      this.productos = data;
    });
  }

  guardarProducto(): void {
    if (!this.editandoProducto) {
      // CREATE
      this.productosService.crearProducto(this.formularioProducto).subscribe(() => {
        this.cargarProductos();
        this.limpiarFormularioProducto();
      });
    } else {
      // UPDATE
      this.productosService.actualizarProducto(this.formularioProducto.id, this.formularioProducto)
        .subscribe(() => {
          this.cargarProductos();
          this.limpiarFormularioProducto();
          this.editandoProducto = false;
        });
    }
  }

  editarProducto(p: Producto): void {
    this.formularioProducto = { ...p };
    this.editandoProducto = true;
  }

  eliminarProducto(id: number): void {
    if (!confirm('¿Eliminar producto?')) return;

    this.productosService.eliminarProducto(id).subscribe(() => {
      this.cargarProductos();
    });
  }

  limpiarFormularioProducto(): void {
    this.formularioProducto = {
      id: 0,
      nombre: '',
      categoria: '',
      precio: 0,
      imagen: '',
      descripcion: ''
    };
  }

  // -------------------------
  // LOGOUT
  // -------------------------
  cerrarSesion() {
    localStorage.removeItem('sesion');
    location.href = '/';
  }
}
