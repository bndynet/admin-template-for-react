import { combineReducers } from 'redux';
import { auth } from '../app/auth/reducers';
import { home } from '../app/home/reducers';
import { global } from '../app/global/actions';

const rootReducer = combineReducers({ global, auth, home });

export default rootReducer;
