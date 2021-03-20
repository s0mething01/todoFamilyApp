import initialState from './initialState';
import actionTypes from './types';

function memberReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_MEMBER:
            return state.map((member) => (member.id === action.payload.id ? action.payload : member));
        case actionTypes.DELETE_MEMBER:
            return state.filter((user) => user.id !== action.payload);
        case actionTypes.ADD_MEMBER:
            return [...state, action.payload];
        case actionTypes.ADD_ALL_MEMBERS:
            return action.payload;
        case actionTypes.RESET_MEMBERS:
            return initialState;
        default:
            return state;
    }
}

export default memberReducer;
