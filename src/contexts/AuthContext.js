import { useContext, useState, useEffect, createContext } from 'react';
import firebase from 'firebase/app';
import { auth } from '../firebaseApp';

const deafultState = { currentUser: null };

const AuthContext = createContext(deafultState);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(deafultState);

    const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);
    const signin = (email, password) => auth.signInWithEmailAndPassword(email, password);
    const signout = () => auth.signOut();

    const value = {
        currentUser,
        signup,
        signin,
        signout,
    };

    useEffect(() => {
        auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
