import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { WishlistService } from '../../services/wishlist.service';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss'
})
export class Wishlist {

  constructor(public wishlist: WishlistService) {}

  obtenerItems(): Producto[] {
    return this.wishlist.obtenerItems();
  }

  eliminar(id: number): void {
    this.wishlist.eliminar(id);
  }
}
