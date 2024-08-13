import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  implements OnInit {
  userEmail:string | null =null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // AuthService'ten kullanıcı e-posta adresini al
    this.userEmail = this.authService.getUserEmail();
    console.log(this.userEmail);

    
  }
  logout(): void { // Fonksiyon bileşen içinde doğru bir şekilde tanımlandı
    this.authService.logout();
    window.location.reload();
  }
}
