// tslint:disable-next-line
import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './history';
import { reducer as auth } from 'app/service/auth';
import { reducer as global } from 'app/service/global';

const createRootReducer = (his: History) =>
    combineReducers({
        router: connectRouter(his),
        global,
        auth,
    });

const rootReducer = createRootReducer(history);

export default rootReducer;
