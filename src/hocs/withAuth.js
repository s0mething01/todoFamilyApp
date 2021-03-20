import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from 'contexts/AuthContext';

const withAuth = (WrappedComponent) => (props) => {
    const { currentUser } = useContext(UserContext);

    return <>{currentUser ? <WrappedComponent {...props} /> : <Redirect to="/" />}</>;
};

export default withAuth;
