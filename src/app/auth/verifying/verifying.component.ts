import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verifying',
  templateUrl: './verifying.component.html',
  styleUrls: ['./verifying.component.scss']
})
export class VerifyingComponent implements OnInit {
  verifyEmailResult:any;
  constructor(private appService:AppService, private authService: AuthService) { }

  ngOnInit() {
    this.verifyEmailResult = null;
    this.appService.initializeApp();
    this.authService.verifyEmailSubject.subscribe(
     (result)=>{
       this.verifyEmailResult = result;
       console.log("VerifyingEmail result:",result);
     })  
    this.authService.verifyEmail();
  }

}
