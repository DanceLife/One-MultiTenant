import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService,private appService: AppService) { }
  emailSigninForm: FormGroup;
  loginByEmail: FormGroup;
  loginByPhone: FormGroup;
  onSendEmailError:string;
  onSendEmailSucceeded:string;
  


  ngOnInit() {
    this.emailSigninForm = new FormGroup({
      'email': new FormControl(null)
    })
    this.loginByEmail = new FormGroup({
      'email': new FormControl(null)
    })
    this.loginByPhone = new FormGroup({
      'email': new FormControl(null)
    })
    
 //   this.authService.initializeApp();
this.appService.initializeApp();

// Confirm the link is a sign-in with email link.
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
   var email = window.localStorage.getItem('emailForSignIn');
  console.log("emailForSignIn returned", email);
  if (!email) {
    // User opened the link on a different device. To prevent session fixation
    // attacks, ask the user to provide the associated email again. For example:
    email = window.prompt('Please provide your email for confirmation');
  }
  // The client SDK will parse the code from the link for you.
  firebase.auth().signInWithEmailLink(email, window.location.href)
    .then(function(result) {
      // Clear email from storage.
      window.localStorage.removeItem('emailForSignIn');
      // You can access the new user via result.user
      // Additional user info profile not available via:
      // result.additionalUserInfo.profile == null
      // You can check if the user is new or existing:
      // result.additionalUserInfo.isNewUser
      console.log("Authentication result",result)
    })
    .catch(function(error) {
      // Some error occurred, you can inspect the code: error.code
      // Common errors could be invalid email and invalid or expired OTPs.
    });
}
  }


  onSendEmail(){
    this.onSendEmailSucceeded = null;
    const email = this.loginByEmail.controls["email"].value;
    try{
     this.authService.sendEmail(email)
    }catch(e){
      if(e.code.indexOf("no-app") > -1)
      this.onSendEmailError = e;
      console.log("onSendEmail Error: ",e);
    }
    
  }

}
