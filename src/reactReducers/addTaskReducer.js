const initialState = {
    id: '',
    points: '',
    expirationDate: '',
    owner: '',
    title: '',
    content: '',
};

const addTaskActionTypes = {
    setDate: 'UPDATE_DATE',
    setOwner: 'UPDATE_OWNER',
    setName: 'UPDATE_NAME',
    setDescription: 'UPDATE_DESCRIPTION',
    setCost: 'UPDATE_COST',
    setTask: 'SET_TASK',
    reset: 'RESET',
};

function addTaskReducer(prevState = initialState, action) {
    switch (action.type) {
        case addTaskActionTypes.setDate:
            return {
                ...prevState,
                expirationDate: action.payload,
            };
        case addTaskActionTypes.setOwner:
            return {
                ...prevState,
                owner: action.payload,
            };
        case addTaskActionTypes.setName:
            return {
                ...prevState,
                title: action.payload,
            };
        case addTaskActionTypes.setDescription:
            return {
                ...prevState,
                content: action.payload,
            };
        case addTaskActionTypes.setCost:
            return {
                ...prevState,
                points: action.payload,
            };
        case addTaskActionTypes.reset:
            return initialState;
        case addTaskActionTypes.setTask:
            return action.payload;
        default:
            return {
                ...prevState,
            };
    }
}

export { initialState, addTaskActionTypes, addTaskReducer };
