import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';

@Injectable({ providedIn: 'root' })
export class ProductosService {

  private readonly apiUrl = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {}
  
// READ: todos
  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
// READ: uno
obtenerProducto(id: number): Observable<Producto> {
  return this.http.get<Producto>(`${this.apiUrl}/${id}`);
}

// CREATE
crearProducto(producto: Producto): Observable<Producto> {
  return this.http.post<Producto>(this.apiUrl, producto);
}

// UPDATE
actualizarProducto(id: number, producto: Producto): Observable<Producto> {
  return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
}

// DELETE
eliminarProducto(id: number): Observable<void> {
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
}

}
