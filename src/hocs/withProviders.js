import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';

import { AccountContextProvider } from 'contexts/AccountContext';
import { ThemeContextProvider } from 'contexts/ThemeContext';
import { AuthContextProvider } from 'contexts/AuthContext';

import store from 'store';

const withProviders = (WrappedComponent) => (props) => {
    return (
        <ReduxProvider store={store}>
            <AccountContextProvider>
                <ThemeContextProvider>
                    <AuthContextProvider>
                        <HelmetProvider>
                            <WrappedComponent {...props} />
                        </HelmetProvider>
                    </AuthContextProvider>
                </ThemeContextProvider>
            </AccountContextProvider>
        </ReduxProvider>
    );
};

export default withProviders;
