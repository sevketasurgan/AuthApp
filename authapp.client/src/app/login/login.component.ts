import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AuthService } from '../services/auth.service';

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
  constructor(private authService: AuthService, private router: Router) {}


onSubmit():void {
    const loginData = { Email: this.email, Password: this.password };

    console.log('Login Component', loginData);
    this.authService.login(this.email, this.password).subscribe({
      
      next: (response) => {
        console.log('Login response:', response);

        this.authService.storeToken(response.token);
        this.showSuccessMessage = true;
        setTimeout(() => {
        this.router.navigate(['/home']);
        
        }, 2000);
        //  window.location.reload();
      },
      error: (error) => {
        this.errorMessage = 'Invalid credentials: ' + error.message;
      }});



//     this.http.post<{ token: string }>('/api/login', loginData).subscribe(

// {
//         next:(response) =>{
//           localStorage.setItem('token', response.token);
//           const decodedToken = jwtDecode<CustomJwtPayload>(response.token) ;
//            console.log(decodedToken.email);
//            localStorage.setItem('email', decodedToken.email);
          
//           this.showSuccessMessage = true;
//           setTimeout(() => {
//             this.router.navigate(['/home']);
//           }, 2000);
//         },
//         error:(error) => {
//           this.errorMessage = 'Login failed: ' + error.error;
//         }
//       }



      // (response) => {
      //   if(response)
      //   localStorage.setItem('token', response.token);
      //   this.showSuccessMessage = true;
      //   this.router.navigate(['/home']);
      // },
      // (error) => {
      //   this.errorMessage = 'Login failed: ' + error.error;
      // }
    
  }
}
