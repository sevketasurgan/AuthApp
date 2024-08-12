import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  showSuccessMessage = false;
  constructor(private http: HttpClient, private router: Router) {}

onSubmit(){
  this.login()
}

  login() {
    const loginData = { Email: this.email, Password: this.password };
    this.http.post<{ token: string }>('/api/login', loginData).subscribe(
      (response) => {
        if(response)
        localStorage.setItem('token', response.token);
        this.showSuccessMessage = true;
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Login failed: ' + error.error;
      }
    );
  }
}
