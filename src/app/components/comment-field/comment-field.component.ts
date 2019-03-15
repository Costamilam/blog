import { Component, Input } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';

@Component({
    selector: 'app-comment-field',
    templateUrl: './comment-field.component.html',
    styleUrls: ['./comment-field.component.css']
})
export class CommentFieldComponent {

    @Input() reply;

    comment = new FormControl('', Validators.required);

    constructor(
        private commentService: CommentService
    ) { }

    sent() {
        this.commentService.createComment(this.comment.value, this.reply)

        this.comment.reset();
    }

}
