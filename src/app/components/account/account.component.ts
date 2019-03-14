import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

import { UserService } from 'src/app/services/user.service';

import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent {

    uid

    file

    form = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
        email: ['', [Validators.email]],
        phone: ['', [Validators.pattern(/\([0-9]{2}\) 9?[0-9]{4}-[0-9]{4}/)]],
        picture: ['']
    });

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        this.userService.getCurrentUser().subscribe(user => {
            this.form.patchValue(user);

            this.uid = user.uid;
        }, () => {
            this.snackBar.open('Conecte-se primeiro para acessar sua conta!', null, {
                duration: 2000,
            });

            this.router.navigate(['/login']);
        });
    }

    delete() {
        const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
            data: {
                question: 'deletar a conta',
                related: ['posts', 'comentários']
            }
        });
    
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.userService.deleteUser();
            }
        });
    }

    changePicture(event) {
        if (event.target.files && event.target.files[0]) {
            this.file = event.target.files[0];
    
            const reader = new FileReader();

            reader.onload = e => this.form.controls.picture.setValue(reader.result);
    
            reader.readAsDataURL(this.file);
        }
    }

    onSubmit() {
        if (this.form.valid) {
            const user = this.form.value;

            if (user.phone) {
                user.phone = user.phone.split('').filter(value => !Number.isNaN(Number.parseInt(value))).join('');
            }

            if (this.file) {
                this.userService.updatePicture(this.uid, this.file).then(response => {
                    response.ref.getDownloadURL().then(url => {
                        user.picture = url;
    
                        this.userService.updateUser(this.uid, user).then(() => {
                            this.router.navigate(['/posts']);
                        });
                    });
                });
            }
        }
    }

}
