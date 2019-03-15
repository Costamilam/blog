import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';

import MarkdownIt from 'markdown-it';

import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent {

    markdown = MarkdownIt();

    id;

    post;

    users = {};

    comments;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private postService: PostService,
        private userService: UserService,
        private commentsService: CommentService,
        private snackBar: MatSnackBar
    ) {
        this.id = this.route.snapshot.params.id;

        this.postService.getPost(this.id).subscribe((post: any) => {
            if (!post) {
                this.snackBar.open('Postagem não encontrado!', null, {
                    duration: 2000,
                });

                this.router.navigate(['/posts']);
            }

            post.content = this.markdown.render(post.content);

            this.post = post;

            this.userService.getUser(post.uid).subscribe(user => {
                this.users[post.uid] = user;

                this.commentsService.getComments(this.id).subscribe((comments: any[]) => {
                    this.comments = comments.map(comment => {
                        comment = { id: comment.key, ...comment.payload.val() };

                        if (!this.users[comment.uid]) {
                            this.userService.getUser(comment.uid).subscribe(user => this.users[comment.uid] = user);
                        }

                        return comment;
                    });
                });
            });
        });
    }

}
