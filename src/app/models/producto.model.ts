export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagen: string;
  descripcion: string;
  descuento?: number | null;   //  AGREGAR DCTO
}
