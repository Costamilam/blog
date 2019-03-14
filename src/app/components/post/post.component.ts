import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import MarkdownIt from 'markdown-it';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent {

    markdown = MarkdownIt();

    post;

    user;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private postService: PostService,
        private userService: UserService,
        private snackBar: MatSnackBar
    ) {
        const id = this.route.snapshot.params.id;

        this.postService.getPost(id).subscribe((post: any) => {
            if (!post) {
                this.snackBar.open('Post não encontrado!', null, {
                    duration: 2000,
                });
    
                this.router.navigate(['/posts']);
            }

            post.content = this.markdown.render(post.content);

            this.post = post;

            this.userService.getUser(post.uid).subscribe(user => this.user = user);
        });
    }

}
