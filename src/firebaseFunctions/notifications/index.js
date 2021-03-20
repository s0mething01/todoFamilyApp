import { db, firebaseApp } from '../../firebaseApp';

const COLLECTION = 'users';

export const add = (userid, notification) => {
    return db
        .collection(COLLECTION)
        .doc(userid)
        .set(
            {
                notifications: firebaseApp.firestore.FieldValue.arrayUnion(notification),
            },
            { merge: true }
        );
};

export const remove = (userid, notification) => {
    return db
        .collection(COLLECTION)
        .doc(userid)
        .update(
            {
                notifications: firebaseApp.firestore.FieldValue.arrayRemove(notification),
            },
            { merge: true }
        );
};

export const update = (userid, newData, prevData) => {
    return db
        .collection(COLLECTION)
        .doc(userid)
        .update(
            {
                notifications: firebaseApp.firestore.FieldValue.arrayRemove(prevData),
            },
            { merge: true }
        )
        .then(() => {
            db.collection(COLLECTION)
                .doc(userid)
                .update(
                    {
                        notifications: firebaseApp.firestore.FieldValue.arrayUnion(newData),
                    },
                    { merge: true }
                );
        });
};
