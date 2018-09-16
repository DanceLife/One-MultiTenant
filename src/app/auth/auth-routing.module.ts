import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignUpComponent } from './signup/signup.component';
import { VerifyingSignUpComponent } from './verifyingsignup/verifyingsignup.component';
import { SignOutComponent } from './signout/signout.component';

const coreRoutes: Routes = [
{ path: 'Register', children: [
    { path: ':SignUp', component: SignUpComponent},
] },
{ path: ':VerifyingSignUp', component: VerifyingSignUpComponent },

];

@NgModule({
 imports: [
     RouterModule.forChild(coreRoutes)
 ],
 exports: [RouterModule]
})
export class AuthRoutingModule{}