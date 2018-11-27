import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { auth } from '../app/auth/reducers';
import { home } from '../app/home/reducers';
import { global } from '../app/global/actions';

export const createRootReducer = (history: History) => (combineReducers({
    router: connectRouter(history),
    global,
    auth,
    home
}));