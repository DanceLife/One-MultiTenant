import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../../app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  emailSigninForm: FormGroup;
  loginByEmail: FormGroup;
  loginByPhone: FormGroup;
  onSendEmailStatus = {code:"",message:""};
  onSendEmailSucceeded:string;
  onSendEmailResult: any;

  constructor(private appService: AppService, private authService: AuthService) { }

  ngOnInit() {
    //Initialize both forms, optionally used to login
    this.loginByEmail = new FormGroup({
      'email': new FormControl(null)
    })
    this.loginByPhone = new FormGroup({
      'email': new FormControl(null)
    })
      //Initialize Firebase app
      this.appService.initializeApp();

      //Subscribe to the send email on authService and act upon changes of sendStatus
      this.authService.sendEmailSubject
      .subscribe(
        (response)=>{
          this.onSendEmailStatus = response;
          console.log("SendEmailSubject: ", response);
        }
      )

  }

  onSendEmail(){
    //reset the message just in case it was a previous error
    this.onSendEmailStatus.message = null;
    //Get the email entered on the box and send it with authService 
    const email = this.loginByEmail.controls["email"].value;       
    this.authService.sendEmail(email);
   }
}
