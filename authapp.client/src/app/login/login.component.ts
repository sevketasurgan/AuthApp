import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginData = { email: '', password: '' };

  constructor(private http: HttpClient) { }

  onLogin() {
    this.http.post('https://localhost:5001/api/login', this.loginData)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
  }
}
