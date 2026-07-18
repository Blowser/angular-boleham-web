import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Header } from './components/header/header';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

// ⭐ ESTA IMPORTACIÓN AHORA SÍ FUNCIONA

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Navbar,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit {

  title = 'angular-boleham';

  get debugTime(): string {
    return new Date().toLocaleTimeString();
  }

  // ⭐ ESTO ACTIVA EL SERVICIO

  ngOnInit(): void {
    console.log('🌐 AppComponent ngOnInit → root montado');
  }

  ngAfterViewInit(): void {
    console.log('🌐 AppComponent ngAfterViewInit → vista inicial lista');
  }
}
