import { db } from '../firebaseApp';

const getUserData = (uid) => {
    return db
        .collection('users')
        .doc(uid)
        .get()
        .then((snap) => snap.data());
};

export default getUserData;
