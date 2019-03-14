import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PostService } from 'src/app/services/post.service';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css']
})
export class PostFormComponent {

    form: FormGroup = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
        description: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(100)]],
        content: ['', [Validators.required, Validators.minLength(300), Validators.maxLength(3000)]]
    });

    id = this.route.snapshot.params.id;

    loaded = true;

    constructor(
        private formBuilder: FormBuilder,
        private postsService: PostService,
        private router: Router,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        if (this.id) {
            this.loaded = false;
        
            this.postsService.getPost(this.id).subscribe(post => {
                if (!post) {
                    this.snackBar.open('Post não encontrado!', null, {
                        duration: 2000,
                    });
        
                    this.router.navigate(['/posts']);
                } else {
                    this.form.patchValue(post);

                    this.loaded = true;
                }
            });
        }
    }

    onSubmit() {
        if (this.form.valid) {
            if (this.id) {
                this.postsService.updatePost(this.id, this.form.value).then(() => this.router.navigate([`/posts/${this.id}`]));
            } else {
                this.postsService.createPost(this.form.value).then(result =>this.router.navigate([`/posts/${result.key}`]));
            }
        }
    }

    delete() {
        if (this.id) {
            const dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent, {
                data: {
                    question: 'deletar o post',
                    related: ['comentários']
                }
            });
        
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.postsService.deletePost(this.id).then(() => this.router.navigate(['/posts']));
                }
            });
        }
    }

}
