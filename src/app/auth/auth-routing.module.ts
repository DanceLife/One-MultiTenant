import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignUpComponent } from './signup/signup.component';
import { VerifyingComponent } from './verifying/verifying.component';

const coreRoutes: Routes = [
{ path: 'Register', children: [
    { path: ':SignUp', component: SignUpComponent,children:[
        { path: ':Verifying', component: VerifyingComponent }
    ] },
] },
];

@NgModule({
 imports: [
     RouterModule.forChild(coreRoutes)
 ],
 exports: [RouterModule]
})
export class AuthRoutingModule{}