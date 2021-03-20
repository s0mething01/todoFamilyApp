import { useContext, createContext } from 'react';
import useStateWithLocalStorage from 'hooks/useStateWithLocalStorage';

const defaultState = {
    role: '',
    ID: '',
};

const AuthContext = createContext(defaultState);

export const useAccount = () => useContext(AuthContext);

export const AccountContextProvider = ({ children }) => {
    const [account, setAccount] = useStateWithLocalStorage('currentAccount', JSON.stringify(defaultState));

    const setCurrentAccount = (val) => setAccount(JSON.stringify(val));
    const resetCurrentAccount = () => setAccount(JSON.stringify(defaultState));

    const value = {
        currentAccount: JSON.parse(account),
        setCurrentAccount,
        resetCurrentAccount,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
