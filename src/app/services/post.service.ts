import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/database';
import { database } from 'firebase';

import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {

    constructor(
        private database: AngularFireDatabase,
        private userService: UserService
    ) { }

    getPosts(): Observable<any> {
        return this.database.object('/posts').valueChanges();
    }

    getPost(id: string) {
        return this.database.object(`/posts/${id}`).valueChanges();
    }

    createPost(post): database.ThenableReference {
        return this.database.list('/posts').push({ uid: this.userService.getCurrentUserId(), ...post });
    }

    updatePost(id, post): Promise<void> {
        return this.database.object(`/posts/${id}`).update(post);
    }

    deletePost(id) {
        return this.database.object(`/posts/${id}`).remove();
    }

}
