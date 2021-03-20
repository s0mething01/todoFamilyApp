const initialState = {
    email: '',
    password: '',
    pin: '',
    selectedUser: null,
};

const loginActionTypes = {
    setEmail: 'UPDATE_EMAIL',
    setPassword: 'UPDATE_PASSWORD',
    setPin: 'UPDATE_PIN',
    setSelectedUser: 'UPDATE_SELECTED_USER',
    resetLogin: 'RESET_LOGIN',
};

function loginReducer(prevState = initialState, action) {
    switch (action.type) {
        case loginActionTypes.setEmail:
            return {
                ...prevState,
                email: action.payload,
            };
        case loginActionTypes.setPassword:
            return {
                ...prevState,
                password: action.payload,
            };
        case loginActionTypes.setPin:
            return {
                ...prevState,
                pin: action.payload,
            };
        case loginActionTypes.setSelectedUser:
            return {
                ...prevState,
                selectedUser: action.payload,
            };
        case loginActionTypes.resetLogin:
            return {
                ...prevState,
                ...initialState,
            };
        default:
            return {
                ...prevState,
            };
    }
}

export { initialState, loginActionTypes, loginReducer };
