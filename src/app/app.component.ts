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
    this.authService.systemAuthStateSubject
    .subscribe(
      (state)=>{
        console.log("App.Component.ts - Auth state: ", state)
      });
         this.authService.getSystemAuthState();   
        }
  constructor(private authService:AuthService){}
}