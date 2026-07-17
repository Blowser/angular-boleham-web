import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],   // ← AGREGAR ESTO
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  constructor(public auth: AuthService) {}

}
