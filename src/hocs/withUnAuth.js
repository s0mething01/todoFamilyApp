import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from 'contexts/AuthContext';

const withUnAuth = (WrappedComponent) => (props) => {
    const user = useContext(UserContext);

    return <>{user.currentUser ? <Redirect to="/tasks" /> : <WrappedComponent {...props} />}</>;
};

export default withUnAuth;
