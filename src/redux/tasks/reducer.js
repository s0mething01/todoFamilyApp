import initialState from './initialState';
import actionTypes from './types';

function tasksReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.UPDATE_TASK:
            return state.map((task) => (task.id === action.payload.id ? action.payload : task));
        case actionTypes.REMOVE_TASK:
            return state.filter((task) => task.id !== action.payload);
        case actionTypes.ADD_TASK:
            return [...state, action.payload];
        case actionTypes.ADD_ALL_TASKS:
            return action.payload;
        case actionTypes.RESET_TASKS:
            return initialState;
        default:
            return state;
    }
}

export default tasksReducer;
