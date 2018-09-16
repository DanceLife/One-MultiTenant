import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { VerifyingSignUpComponent } from './verifyingsignup/verifyingsignup.component';
import { UsermessagePipe } from './usermessage.pipe';
import { SignOutComponent } from './signout/signout.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AuthRoutingModule
  ],
  declarations: [
    SignUpComponent,
    SigninComponent,
    VerifyingSignUpComponent,
    UsermessagePipe,
    SignOutComponent, 
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule { }
