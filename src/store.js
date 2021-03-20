import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import allReducers from 'redux/allReducers';

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

window.store = store;

export default store;
