import { combineReducers } from 'redux';

import tasksReducer from 'redux/tasks';
import awardsReducer from 'redux/awards';
import membersReducer from 'redux/members';
import notificationsReducer from 'redux/notifications';

const allReducers = combineReducers({ tasks: tasksReducer, awards: awardsReducer, members: membersReducer, notifications: notificationsReducer });

export default allReducers;
