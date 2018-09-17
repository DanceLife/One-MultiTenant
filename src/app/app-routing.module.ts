import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OptionsComponent } from './options/options.component';
import { BrandComponent } from './core/brand/brand.component';
import { SearchComponent } from './search/search.component';
import { GardeningComponent } from './articles/gardening/gardening.component';
import { DancingComponent } from './articles/dancing/dancing.component';
import { SpaceComponent } from './articles/space/space.component';
import { SignOutComponent } from './auth/signout/signout.component';
import { FirebaseConfigComponent } from './userdata/firebaseconfig/firebaseconfig.component';
import { PersistComponent } from './persist/persist.component';

const appRoutes: Routes = [
  {path: "Register", children:[
    {path: "Options",component: OptionsComponent},
    {path: "Firebase", component: FirebaseConfigComponent}
  ]},
  {path: "Articles", children:[
    {path: "Gardening", component: GardeningComponent},
    {path: "Space_Traveling", component: SpaceComponent},
    {path: "Dancing", component: DancingComponent}
  ]},
  {path: "Search", component: SearchComponent},
  {path: "About", component: BrandComponent},
  { path: 'SignOut', component: SignOutComponent},
  {path: "Persist", component: PersistComponent},
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
