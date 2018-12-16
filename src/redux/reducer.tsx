import { combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';

import { auth } from '../app/auth/reducers';
import { home } from '../app/home/reducers';
import { global } from '../app/global/actions';
import history from './history';

const createRootReducer = (his: History) => (combineReducers({
    router: connectRouter(his),
    global,
    auth,
    home,
}));

const rootReducer = createRootReducer(history);

export default rootReducer;
