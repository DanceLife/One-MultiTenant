import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { OptionsComponent } from './options/options.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { GardeningComponent } from './articles/gardening/gardening.component';
import { SpaceComponent } from './articles/space/space.component';
import { DancingComponent } from './articles/dancing/dancing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from './app.service';
import { DataModule } from './userdata/data.module';
import { FirebaseUserComponent } from './firebase-user/firebase-user.component';
import { FirebaseSystemComponent } from './firebase-system/firebase-system.component';

@NgModule({
  declarations: [
    AppComponent,
    OptionsComponent,
    SearchComponent,
    GardeningComponent,
    SpaceComponent,
    DancingComponent,
    FirebaseSystemComponent,
    FirebaseUserComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
    DataModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
