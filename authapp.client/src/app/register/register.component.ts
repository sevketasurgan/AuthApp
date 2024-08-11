import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerData = { email: '', password: '' };

  constructor(private http: HttpClient) { }

  onRegister() {
    this.http.post('https://localhost:5001/api/login', this.registerData)
      .subscribe(response => {
        console.log(response);
      }, error => {
        console.error(error);
      });
  }
}
