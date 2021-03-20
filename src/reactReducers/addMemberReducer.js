import { types as AccountTypes } from 'components/Account/AccountTypes';

const initialState = {
    name: '',
    pin: '',
    pinR: '',
    color: 0,
    description: '',
    image: '',
    role: AccountTypes.CHILD,
    activeTasks: 0,
    pointsGiven: 0,
    tasksGiven: 0,
    points: 0,
    totalPoints: 0,
    tasksDone: 0,
    totalTasksDone: 0,
};

const addMemberActionTypes = {
    setName: 'UPDATE_NAME',
    setPIN: 'UPDATE_PIN',
    setPINR: 'UPDATE_PINR',
    setColor: 'UPDATE_COLOR',
    setDescription: 'UPDATE_DESCRIPTION',
    setImage: 'UPDATE_IMAGE',
    setRole: 'UPDATE_ROLE',
    reset: 'RESET',
};

function addMemberReducer(prevState = initialState, action) {
    switch (action.type) {
        case addMemberActionTypes.setName:
            return {
                ...prevState,
                name: action.payload,
            };
        case addMemberActionTypes.setPIN:
            return {
                ...prevState,
                PIN: action.payload,
            };
        case addMemberActionTypes.setPINR:
            return {
                ...prevState,
                PINR: action.payload,
            };
        case addMemberActionTypes.setColor:
            return {
                ...prevState,
                color: action.payload,
            };
        case addMemberActionTypes.setDescription:
            return {
                ...prevState,
                description: action.payload,
            };
        case addMemberActionTypes.setImage:
            return {
                ...prevState,
                image: action.payload,
            };
        case addMemberActionTypes.setRole:
            return {
                ...prevState,
                role: action.payload,
            };
        case addMemberActionTypes.reset:
            return {
                ...initialState,
            };
        default:
            return {
                ...prevState,
            };
    }
}

export { initialState, addMemberActionTypes, addMemberReducer };
