import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    isAdmin = false;

    hasUser = false;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.userService.hasUser.subscribe(value => this.hasUser = value);

        this.userService.isAdmin.subscribe(value => this.isAdmin = value);
    }

    logout() {
        this.userService.logout().then(() => this.router.navigate(['/login']));
    }

}
