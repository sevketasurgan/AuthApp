import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import { Router } from '@angular/router';

interface CustomJwtPayload extends JwtPayload{
  email?: string;
  // Diğer claim'ler burada
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7265/api/login'; // Login API URL'inizi güncelleyin

  constructor(private http: HttpClient, private router: Router) {}

  login(Email: string, Password: string): Observable<{ token: string }> {
    console.log('login method called');
    console.log('API URL:', this.apiUrl);
    console.log('Request body:', { Email, Password });
    return this.http.post<{ token: string }>(this.apiUrl, { Email, Password });
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);

    // Decode token to get email
    try {
      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      if (decodedToken.email) {
        localStorage.setItem('email', decodedToken.email);
      }
    } catch (error) {
      console.error('Token decode error:', error);
    }
  }

  getUserEmail(): string | null {
    return localStorage.getItem('email');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
    window.location.reload();
  }
}
