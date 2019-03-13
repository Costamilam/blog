import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Firebase Modules
import { FirebaseModule } from './modules/firebase.module';

//Angular Material Design Modules
import { MaterialDesignModule } from './modules/material-design.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FirebaseModule,
        MaterialDesignModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
