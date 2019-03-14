import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    isAdmin = new Subject<boolean>();

    isAdminSubscriber

    hasUser = new Subject<boolean>();

    constructor(
        private database: AngularFireDatabase,
        private storage: AngularFireStorage,
        private auth: AngularFireAuth
    ) {
        this.hasUser.next(false);

        this.isAdmin.next(false);
    }

    getCurrentUserId() {
        return this.auth.auth.currentUser ? this.auth.auth.currentUser.uid : null;
    }

    getCurrentUser() {
        const uid = this.getCurrentUserId();

        return uid == null ? throwError(null) : this.getUser(uid);
    }

    getUser(uid): Observable<any> {
        return this.database.object(`/users/${uid}`).valueChanges();
    }

    updateUser(uid, user) {
        return this.database.object(`/users/${uid}`).update(user);
    }

    updatePicture(uid, file) {
        return this.storage.upload(`/users/${uid}`, file);
    }

    deleteUser() {
        return this.auth.auth.currentUser.delete();
    }

    logout() {
        return this.auth.auth.signOut().then(response => {
            this.hasUser.next(false);

            this.isAdmin.next(false);

            if (this.isAdminSubscriber && this.isAdminSubscriber.unsubscribe) {
                this.isAdminSubscriber.unsubscribe()
            }

            return response;
        });
    }

    authUser(provider) {
        return this.auth.auth.signInWithPopup(provider).then(response => {
            this.hasUser.next(true);

            this.isAdminSubscriber = this.database.object(`/admins/${this.getCurrentUserId()}`).valueChanges().subscribe(value => {
                if (value == true) {
                    this.isAdmin.next(true);
                } else {
                    this.isAdmin.next(false);
                }
            });

            return response;
        });
    }

    authGoogle() {
        return this.authUser(new auth.GoogleAuthProvider());
    }

}
