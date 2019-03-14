import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

//Firebase Modules
import { FirebaseModule } from './modules/firebase.module';

//Angular Material Design Modules
import { MaterialDesignModule } from './modules/material-design.module';

//Routing Modules
import { AppRoutingModule } from './app-routing.module';

//Pipes and Directives
import { PhonePipe } from './pipes/phone.pipe';
import { PhoneDirective } from './directivess/phone.directive';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

//Posts Components
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostFormComponent } from './components/post-form/post-form.component';

//User Components
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { AdminComponent } from './components/admin/admin.component';

// Modals
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PostComponent,
        PostsComponent,
        PostCardComponent,
        PostFormComponent,
        LoginComponent,
        AccountComponent,
        AdminComponent,
        ConfirmDialogComponent,
        PhonePipe,
        PhoneDirective
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FirebaseModule,
        MaterialDesignModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
