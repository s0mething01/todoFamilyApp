import initialState from './initialState';
import actionTypes from './types';

function notificationsReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_NOTIFICATION:
            return state.map((notification) => (notification.id === action.payload.id ? action.payload : notification));
        case actionTypes.REMOVE_NOTIFICATION:
            return state.filter((notification) => notification.id !== action.payload);
        case actionTypes.ADD_NOTIFICATION:
            return [...state, action.payload];
        case actionTypes.ADD_ALL_NOTIFICATIONS:
            return action.payload;
        default:
            return state;
    }
}

export default notificationsReducer;
