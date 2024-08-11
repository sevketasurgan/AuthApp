import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }

  onSubmit() {
    const loginData = { email: this.email, password: this.password };
    this.http.post('/api/login', loginData, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe((response: HttpResponse<string> | any) => {
        if (response instanceof HttpResponse) {
          const status = response.status;
          console.log("Status code " + status);
          if (status === 200) {
            console.log('Login successful');
            this.errorMessage = "Successfully Logined."
            // Giriş başarılı olduğunda yapılacak işlemler
          }
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
