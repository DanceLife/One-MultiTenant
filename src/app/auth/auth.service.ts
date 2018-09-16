import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class AuthService {
  token: string;
  savedEmail = new Subject();
  currentUser: any; 
  authKey = {"apiKey": null,"authDomain": null}  
  authKeySubject = new Subject<{"apiKey": null,"authDomain": null}>();
  appInitName: string;
  currentAppName = "One";
  sendEmailSubject: Subject<any>;
  verifyEmailSubject: Subject<any>;
  authStateSubject: Subject<any>;

  getAuthState(){
    firebase.auth().onAuthStateChanged(
      (state)=>{
        this.authStateSubject.next(state);
      });    
    console.log("Current user: ",firebase.auth().currentUser)
  }

  getCurrentUser(){
    console.log("Current user: ",firebase.auth().currentUser)
  }

  actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // url: 'https://www.example.com/finishSignUp?cartId=1234',
    url: 'http://localhost/VerifyingSignUp',
    handleCodeInApp: true,
  };
  
  constructor(private router: Router) {
    this.sendEmailSubject = new Subject<any>();
    this.verifyEmailSubject = new Subject<any>();
    this.authStateSubject = new Subject<any>();
  }

  sendEmail(email: string){
    try{
    firebase.auth().sendSignInLinkToEmail(email, this.actionCodeSettings).then(
      ()=>{
        localStorage.setItem('emailForSignIn',email);
        let onSendEmailStatus = {code: "send/succeeded", message:"Email sent and saved as: "+ email};
        this.sendEmailSubject.next(onSendEmailStatus);        
      }).catch(
      (e)=>{
        this.sendEmailSubject.next({code:e.code,message:e.message});
      })
    }catch(e){
      this.sendEmailSubject.next({code:e.code,message:e.message});
    }
    }

  verifyEmail(){
        // Confirm the link is a sign-in with email link.
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
          var email = localStorage.getItem('emailForSignIn');
          console.log("localStorage emailForSignIn returned", email);
          if (!email) {
            // User opened the link on a different device. To prevent session fixation
            // attacks, ask the user to provide the associated email again. For example:
            email = window.prompt('Please provide your email for confirmation');
          }
    try{
          //If no email entered let's avoid internal error by no passing a null
          email = email == null ? "" : email;
          // The client SDK will parse the code from the link for you. 
          firebase.auth().signInWithEmailLink(email, window.location.href)
            .then(
              (result) => {
              // Clear email from storage.
              const signUpInformation = JSON.parse(localStorage.getItem('RegistrationInformation'));               
              window.localStorage.removeItem('RegistrationInformation');
              // You can access the new user via result.user
              // Additional user info profile not available via:
              // result.additionalUserInfo.profile == null
              // You can check if the user is new or existing:
              // result.additionalUserInfo.isNewUser
              firebase.auth().currentUser.updateProfile({displayName:signUpInformation.name,photoURL:'pending'})
             // firebase.auth().currentUser.updatePhoneNumber              

              console.log("Authentication result",result)
              this.verifyEmailSubject.next({ code:'verify/succeeded',message:'Email verification succeeded. Thank you for subscribing with us.', result: result});
            }).catch(
              (error) => {
              // Some error occurred, you can inspect the code: error.code
              // Common errors could be invalid email and invalid or expired OTPs.       
              console.log("verifyEmail error",error)
              this.verifyEmailSubject.next({code: error.code, message: error.message});
            });
        }catch(e){
          console.log("verifyEmail fatal error",e)
          this.verifyEmailSubject.next(e);
        }  
      }
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            )
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

  isAuthenticated() {
    return this.token != null;
  }


}
