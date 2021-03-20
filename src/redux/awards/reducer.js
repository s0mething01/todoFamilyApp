import initialState from './initialState';
import actionTypes from './types';

function awardsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_AWARD:
            return state.map((award) => (award.id === action.payload.id ? action.payload : award));
        case actionTypes.REMOVE_AWARD:
            return state.filter((award) => award.id !== action.payload);
        case actionTypes.ADD_AWARD:
            return [...state, action.payload];
        case actionTypes.ADD_ALL_AWARDS:
            return action.payload;
        case actionTypes.RESET_AWARDS:
            return initialState;
        default:
            return state;
    }
}

export default awardsReducer;
