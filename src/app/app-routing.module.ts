import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { LoginComponent } from './components/login/login.component';
import { AccountComponent } from './components/account/account.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    component: HomeComponent
}, {
    path: 'login',
    component: LoginComponent
}, {
    path: 'account',
    component: AccountComponent
}, {
    path: 'admin',
    component: AdminComponent
}, {
    path: 'posts/create',
    component: PostFormComponent,
}, {
    path: 'posts/edit/:id',
    component: PostFormComponent,
}, {
    path: 'posts/:id',
    component: PostComponent
}, {
    path: 'posts',
    component: PostsComponent
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
