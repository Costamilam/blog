import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const setPostDate = functions.database.ref('/posts/{id}').onCreate((snapshot, context) => {
    const data = snapshot.val();

    data.date = new Date().toISOString();

    snapshot.ref.set(data).catch(error => {
        console.error('Failed to add date when creating post: ', error)
    });
});

export const removePostComments = functions.database.ref('/posts/{id}').onDelete((snapshot, context) => {
    admin.database().ref('/comments').orderByChild('reply').equalTo(context.params.id).once('value').then(value => {
        value.forEach(item => {
            item.ref.remove().catch(error => {
                console.error('failed to remove comment when deleting post: ', error)
            });
        })
    }).catch(error => {
        console.error('Failed to get comments while deleting post: ', error)
    });
});

export const setCommentDate = functions.database.ref('/comments/{id}').onCreate((snapshot, context) => {
    const data = snapshot.val();

    data.date = new Date().toISOString();

    snapshot.ref.set(data).catch(error => {
        console.error('Failed to add date when creating comment: ', error)
    });
});

export const removeCommentComments = functions.database.ref('/comments/{id}').onDelete((snapshot, context) => {
    admin.database().ref('/comments').orderByChild('reply').equalTo(context.params.id).once('value').then(value => {
        value.forEach(item => {
            item.ref.remove().catch(error => {
                console.error('failed to remove comment when deleting comment: ', error)
            });
        })
    }).catch(error => {
        console.error('Failed to get comments while deleting comment: ', error)
    });
});

export const createUserFromDatabase = functions.auth.user().onCreate((user, context) => {
    admin.database().ref(`/users/${user.uid}`).set({
        name: user.displayName,
        picture: user.photoURL,
        email: user.email,
        phone: user.phoneNumber
    }).catch(error => {
        console.error('Failed to create user in database: ', error)
    });
});

export const removeUserFromDatabase = functions.auth.user().onDelete((user, context) => {
    admin.database().ref('/posts').orderByChild('uid').equalTo(user.uid).once('value').then(value => {
        value.forEach(item => {
            item.ref.remove().catch(error => {
                console.error('failed to remove post when deleting user: ', error)
            });
        })
    }).catch(error => {
        console.error('Failed to get user posts while deleting user: ', error)
    });

    admin.database().ref('/comments').orderByChild('uid').equalTo(user.uid).once('value').then(value => {
        value.forEach(item => {
            item.ref.remove().catch(error => {
                console.error('failed to remove comment when deleting user: ', error)
            });
        })
    }).catch(error => {
        console.error('Failed to get user comments while deleting user: ', error)
    });

    admin.database().ref(`/users/${user.uid}`).remove().catch(error => {
        console.error('Failed to delete user: ', error)
    });
});
