import { db } from '../firebaseApp';

const defaultUserTemplate = {
    familyName: '',
    tasks: [],
    awards: [],
    users: [],
    notifications: [],
};
const createUserTemplate = (uid, userTemplate = defaultUserTemplate) => {
    return db.collection('users').doc(uid).set(userTemplate);
};

export default createUserTemplate;
