import { db, firebaseApp } from '../../firebaseApp';

const COLLECTION = 'users';

export const add = (userid, userdata) => {
    return db
        .collection(COLLECTION)
        .doc(userid)
        .set(
            {
                users: firebaseApp.firestore.FieldValue.arrayUnion(userdata),
            },
            { merge: true }
        );
};

export const remove = (userid, userdata) => {
    return db
        .collection(COLLECTION)
        .doc(userid)
        .update(
            {
                users: firebaseApp.firestore.FieldValue.arrayRemove(userdata),
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
                users: firebaseApp.firestore.FieldValue.arrayRemove(prevData),
            },
            { merge: true }
        )
        .then(() => {
            db.collection(COLLECTION)
                .doc(userid)
                .update(
                    {
                        users: firebaseApp.firestore.FieldValue.arrayUnion(newData),
                    },
                    { merge: true }
                );
        });
};
