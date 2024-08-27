import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!this.authService.getUserEmail();
    if (!isAuthenticated) {
      this.router.navigate(['/login']); // Giriş yapmamış kullanıcıları login sayfasına yönlendir
      return false;
    }
    return true;
  }
}

