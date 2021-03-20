import getID from 'utils/getID';

const initialState = {
    email: '',
    password: '',
    passwordR: '',
    familyName: '',
    familyMembers: [],
};

const registerActionTypes = {
    setEmail: 'UPDATE_EMAIL',
    setPassword: 'UPDATE_PASSWORD',
    setPasswordR: 'UPDATE_PASSWORDR',
    setFamilyName: 'UPDATE_FAMILY_NAME',
    setfamilyMembers: 'UPDATE_FAMILY_MEMBERS',
    resetRegister: 'RESET_REGISTER',
};

function registerReducer(prevState = initialState, action) {
    switch (action.type) {
        case registerActionTypes.setEmail:
            return {
                ...prevState,
                email: action.payload,
            };
        case registerActionTypes.setPassword:
            return {
                ...prevState,
                password: action.payload,
            };
        case registerActionTypes.setPasswordR:
            return {
                ...prevState,
                passwordR: action.payload,
            };
        case registerActionTypes.setFamilyName:
            return {
                ...prevState,
                familyName: action.payload,
            };
        case registerActionTypes.setFamilyMembers:
            return {
                ...prevState,
                familyMembers: [...prevState.familyMembers, { ...action.payload, id: getID() }],
            };
        case registerActionTypes.resetRegister:
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

export { initialState, registerActionTypes, registerReducer };
