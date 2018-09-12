import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { OptionsComponent } from './options/options.component';
import { EnvironmentComponent } from './environment/environment.component';
import { SearchComponent } from './search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { GardeningComponent } from './articles/gardening/gardening.component';
import { SpaceComponent } from './articles/space/space.component';
import { DancingComponent } from './articles/dancing/dancing.component';

@NgModule({
  declarations: [
    AppComponent,
    OptionsComponent,
    EnvironmentComponent,
    SearchComponent,
    GardeningComponent,
    SpaceComponent,
    DancingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
