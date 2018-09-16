import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { NavigationComponent } from "./navigation/navigation.component";
import { BrandComponent } from './brand/brand.component';
import { CoreRoutingModule } from "./core-routing.module";
import { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule } from '@angular/forms';
import { Name2InitialsPipe } from './name2initials.pipe';
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        HomeComponent,
        NavigationComponent,
        BrandComponent,
        Name2InitialsPipe
    ],
    imports: [
        CommonModule,
        AppRoutingModule,
        CoreRoutingModule,
        ReactiveFormsModule
    ],
    exports: [
        NavigationComponent,
        CoreRoutingModule
    ]
})
export class CoreModule{}