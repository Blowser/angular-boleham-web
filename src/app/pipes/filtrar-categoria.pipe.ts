import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../models/producto.model';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class CategoryFilterPipe implements PipeTransform {

  transform(productos: Producto[], categoria: string): Producto[] {
    if (!categoria) return productos;
    return productos.filter(p => p.categoria === categoria);
  }
}
