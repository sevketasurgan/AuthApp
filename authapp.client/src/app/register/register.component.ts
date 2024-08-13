import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  successMessage = false;

  constructor(private http: HttpClient,private router: Router) { }

  onSubmit(form: NgForm) {
    const registerData = { email: this.email, password: this.password };
    this.http.post('/api/register', registerData, { observe: 'response', responseType: 'text' })
      .pipe(
        catchError(this.handleError.bind(this))
      )
      .subscribe((response: HttpResponse<string> | any) => {
        if (response instanceof HttpResponse) {
          const status = response.status;
          console.log("Status code " + status);
          if (status === 200) {
            console.log('Register successful');
            // this.errorMessage = "User Registered."
            this.successMessage = true;
            setTimeout(() => {
              this.router.navigate(['/home']);
              
              }, 2000);
          }
        }
      });
  }

  private handleError(error: HttpErrorResponse) {
    // Hata durumunu işleme
    console.error('Register failed', error);
    this.errorMessage = 'Register failed. Please check your credentials.';
    return of(error);
  }
}
