import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authapp.client';
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }

  onSubmit() {
    const loginData = { email: this.email, password: this.password };
    this.http.post('https://localhost:7265/api/login', loginData, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe((response: HttpResponse<string> | any) => {
        if (response instanceof HttpResponse) {
          const status = response.status;
          if (status === 200) {
            console.log('Login successful');
            // Giriş başarılı olduğunda yapılacak işlemler
          } else if (status === 409) {
            console.error('User exists');
            this.errorMessage = 'User already exists. Please try a different email.';
          } else {
            console.error('Unexpected response status:', status);
            this.errorMessage = 'An unexpected error occurred. Please try again.';
          }
        } else {
          // Yanıt nesnesi HttpResponse değilse, burada işlem yapılabilir
          console.error('Unexpected response:', response);
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    // Hata durumunu işleme
    console.error('Login failed', error);
    this.errorMessage = 'Login failed. Please check your credentials.';
    return of(error);
  }
}
