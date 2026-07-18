import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RouterDebugService {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {
        console.log('🚦 NAV START →', event.url);
      }

      if (event instanceof NavigationEnd) {
        console.log('✅ NAV END →', event.url);
      }

      if (event instanceof NavigationCancel) {
        console.warn('⛔ NAV CANCEL →', event.reason);
      }

      if (event instanceof NavigationError) {
        console.error('💥 NAV ERROR →', event.error);
      }

    });
  }
}
