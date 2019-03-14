import { Component } from '@angular/core';

import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent {

    _data = [];

    get data() {
        return this._data;
    }

    set data(posts: any) {
        for (const id in posts) {
            const index = this.data.push({
                post: Object.assign(posts[id], { id: id })
            }) - 1;

            this.userService.getUser(posts[id].uid).subscribe(user => {
                this.data[index].user = user;
            });
        }
    }

    constructor(
        private postService: PostService,
        private userService: UserService
    ) {
        this.postService.getPosts().subscribe(posts => this.data = posts);
    }

}
