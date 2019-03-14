import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    constructor(
        private router: Router,
        private userService: UserService,
        private snackBar: MatSnackBar
    ) { }

    authGoogle() {
        this.userService.authGoogle().then(() => {
            this.router.navigate(['/posts']);
        }).catch(error => {
            this.snackBar.open(`Falha: ${error.message}`, null, {
                duration: 2000,
            });
        });
    }

}
