import { db, firebaseApp } from '../../firebaseApp';

const COLLECTION = 'users';

export const add = (userid, data) => {
    return db
        .collection(COLLECTION)
        .doc(userid)
        .set(
            {
                awards: firebaseApp.firestore.FieldValue.arrayUnion(data),
            },
            { merge: true }
        );
};

export const remove = (userid, data) => {
    return db
        .collection(COLLECTION)
        .doc(userid)
        .update(
            {
                awards: firebaseApp.firestore.FieldValue.arrayRemove(data),
            },
            { merge: true }
        );
};

export const update = (userid, prevData, newData) => {
    return db
        .collection(COLLECTION)
        .doc(userid)
        .update(
            {
                awards: firebaseApp.firestore.FieldValue.arrayRemove(prevData),
            },
            { merge: true }
        )
        .then(() => {
            db.collection(COLLECTION)
                .doc(userid)
                .update(
                    {
                        awards: firebaseApp.firestore.FieldValue.arrayUnion(newData),
                    },
                    { merge: true }
                );
        });
};
