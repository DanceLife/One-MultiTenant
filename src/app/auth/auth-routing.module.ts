import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignUpComponent } from './signup/signup.component';
import { VerifyingSignUpComponent } from './verifyingsignup/verifyingsignup.component';
import { FirebaseUserComponent } from '../firebase-user/firebase-user.component';
import { OptionsComponent } from '../options/options.component';

const coreRoutes: Routes = [
{ path: 'Register', children: [
    { path: 'SignUp', component: SignUpComponent},
    { path: 'Options', component: OptionsComponent},
] },
{ path: ':VerifyingSignUp', component: VerifyingSignUpComponent },
{ path: ':Firebase', component: FirebaseUserComponent},

];

@NgModule({
 imports: [
     RouterModule.forChild(coreRoutes)
 ],
 exports: [RouterModule]
})
export class AuthRoutingModule{}