import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseConfigComponent } from './firebaseconfig/firebaseconfig.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KeysPipe } from '../shared/keys.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    KeysPipe,
    FirebaseConfigComponent,
  ],
  exports:[
    KeysPipe,
  ]
})
export class DataModule { }
