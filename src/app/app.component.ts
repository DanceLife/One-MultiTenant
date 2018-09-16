import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    this.appService.initializeApp();
    this.authService.authStateSubject
    .subscribe(
      (state)=>{
        console.log("Auth state: ", state)
      });
      console.log("Getting auth state");
      this.authService.getAuthState();
    
  }
  constructor(private authService:AuthService, private appService:AppService){}

  title = 'One-Navigation';
}
