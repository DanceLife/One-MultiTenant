import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import{ HomeComponent } from './home/home.component';
import { SigninComponent } from '../auth/signin/signin.component';

const coreRoutes: Routes = [
{ path: 'Home', component: HomeComponent },
{ path: '', component: HomeComponent }
];

@NgModule({
 imports: [
     RouterModule.forChild(coreRoutes),
 ],
 exports: [RouterModule]
})
export class CoreRoutingModule{}