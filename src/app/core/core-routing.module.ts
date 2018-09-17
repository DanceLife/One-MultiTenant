import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import{ HomeComponent } from './home/home.component';
import { FirebaseSystemComponent } from '../firebase-system/firebase-system.component';
import { FirebaseUserComponent } from '../firebase-user/firebase-user.component';

const coreRoutes: Routes = [
{ path: 'SystemConfiguration', component: FirebaseSystemComponent },
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