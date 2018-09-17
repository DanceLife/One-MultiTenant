import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  get name() { return this.signUpForm.get('name') }
  get email() { return this.signUpForm.get('email') }

  onSendEmailStatus = {code:"",message:""};
  signingUpActive: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log("signup")
    //Initialize both forms, optionally used to login
    this.signUpForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      'email': new FormControl(null, [Validators.required,Validators.email]),
    });

    console.log("Form:", this.signUpForm)

    //Initialize the system app
    this.authService.getApp("System");

    //Subscribe to the send email on authService and act upon changes of sendStatus
    this.authService.sendEmailSubject
    .subscribe(
      (response)=>{
        this.onSendEmailStatus = response;
        console.log("SendEmailSubject: ", response);
      });
    }

  onSendEmail(){
    //reset the message just in case it was a previous error
    this.onSendEmailStatus.message = null;
    console.log("Form:", this.signUpForm)
    //If the form is valid then proceed
    if(this.signUpForm.valid){
    //Persist the information entered on the form and send the email entered on the box with authService 
    const registrationInformation = {
      name: this.signUpForm.controls.name.value, 
      email: this.signUpForm.controls.email.value, 
    }
    localStorage.setItem('RegistrationInformation',JSON.stringify(registrationInformation));       
    this.authService.sendEmail(registrationInformation.email);
    }
   }
}
