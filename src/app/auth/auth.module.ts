import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { VerifyingComponent } from './verifying/verifying.component';
import { UsermessagePipe } from './usermessage.pipe';

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
    VerifyingComponent,
    UsermessagePipe, 
  ],
  providers:[
    AuthService
  ]
})
export class AuthModule { }
