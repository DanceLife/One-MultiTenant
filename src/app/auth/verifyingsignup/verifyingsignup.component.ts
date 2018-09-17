import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verifyingsignup',
  templateUrl: './verifyingsignup.component.html',
  styleUrls: ['./verifyingsignup.component.scss']
})
export class VerifyingSignUpComponent implements OnInit {
  verifyEmailResult:any = {code:null, message:null};
 
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("verifyingsignup")
        
    this.verifyEmailResult = null;
    this.authService.verifyEmailSubject.subscribe(
     (result)=>{
       this.verifyEmailResult = { code:result.code,message:result.message };
       console.log("VerifyingEmail result:",this.verifyEmailResult);
       if(this.verifyEmailResult.code == "verify/succeeded"){
        console.log("Verify succedded with this result: ", result)
       }
     })  
    this.authService.verifyEmail();
  }
}
