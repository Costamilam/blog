import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class CommentService {

    constructor(
        private database: AngularFireDatabase,
        private userService: UserService
    ) { }

    getComments(from) {
        return this.database.list('/comments', ref => ref.orderByChild('reply').equalTo(from)).snapshotChanges();
    }

    createComment(comment, reply) {
        this.database.list('/comments').push({
            content: comment,
            reply: reply,
            uid: this.userService.getCurrentUserId()
        });
    }

}
