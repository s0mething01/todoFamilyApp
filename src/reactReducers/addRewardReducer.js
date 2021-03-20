const initialState = {
    name: '',
    subname: '',
    points: '',
    image: '',
    color: 0,
};

const addRewardActionTypes = {
    setName: 'UPDATE_NAME',
    setSubname: 'UPDATE_SUBNAME',
    setPoints: 'UPDATE_POINTS',
    setImage: 'UPDATE_IMAGE',
    setColor: 'UPDATE_COLOR',
    reset: 'RESET',
};

function addRewardReducer(prevState = initialState, action) {
    switch (action.type) {
        case addRewardActionTypes.setColor:
            return {
                ...prevState,
                color: action.payload,
            };
        case addRewardActionTypes.setName:
            return {
                ...prevState,
                name: action.payload,
            };
        case addRewardActionTypes.setSubname:
            return {
                ...prevState,
                subname: action.payload,
            };
        case addRewardActionTypes.setPoints:
            return {
                ...prevState,
                points: action.payload,
            };
        case addRewardActionTypes.setImage:
            return {
                ...prevState,
                image: action.payload,
            };
        case addRewardActionTypes.reset:
            return initialState;
        default:
            return {
                ...prevState,
            };
    }
}

export { initialState, addRewardActionTypes, addRewardReducer };
