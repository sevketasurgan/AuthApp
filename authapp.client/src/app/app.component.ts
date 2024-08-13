import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Component } from '@angular/core';
// import { OnInit } from '@angular/core';

// import { JwtService } from './services/jwt.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'authapp.client';
  // userName : string|null = null;
  constructor(private router: Router) {
    
    

  }
}
