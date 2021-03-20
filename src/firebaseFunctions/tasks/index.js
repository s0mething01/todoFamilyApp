import { db, firebaseApp } from '../../firebaseApp';

const COLLECTION = 'users';

export const add = (userid, data) => {
    return db
        .collection(COLLECTION)
        .doc(userid)
        .set(
            {
                tasks: firebaseApp.firestore.FieldValue.arrayUnion(data),
            },
            { merge: true }
        );
};

export const remove = (userid, prevData) => {
    return db
        .collection(COLLECTION)
        .doc(userid)
        .update(
            {
                tasks: firebaseApp.firestore.FieldValue.arrayRemove(prevData),
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
                tasks: firebaseApp.firestore.FieldValue.arrayRemove(prevData),
            },
            { merge: true }
        )
        .then(() => {
            db.collection(COLLECTION)
                .doc(userid)
                .update(
                    {
                        tasks: firebaseApp.firestore.FieldValue.arrayUnion(newData),
                    },
                    { merge: true }
                );
        });
};
