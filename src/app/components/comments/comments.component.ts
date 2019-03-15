import { Component, Input } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

    @Input() reply;

    @Input() users = {};

    @Input() set comments(comments) {
        this._comments = [];

        if (comments) {
            for (const comment of comments) {
                this.commentService.getComments(comment.id).subscribe(subcomments => {
                    this._comments = this._comments.filter(item => {
                        return item.id != comment.id;
                    });

                    comment.subcomments = subcomments.map(comment => {
                        return { id: comment.key, ...comment.payload.val() };
                    });

                    this._comments.push(comment);
                });
            }
        }
    };

    get comments() {
        return this._comments;
    }

    _comments;

    constructor(
        private commentService: CommentService
    ) { }

}
