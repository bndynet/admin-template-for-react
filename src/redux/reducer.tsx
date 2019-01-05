// tslint:disable-next-line
import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';
import { home } from '../app/home/reducers';
import { reducer as global } from '../service/global';
import { reducer as auth } from '../service/auth';

const createRootReducer = (his: History) => (combineReducers({
    router: connectRouter(his),
    global,
    auth,
    home,
}));

const rootReducer = createRootReducer(history);

export default rootReducer;
