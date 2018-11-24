import { combineReducers } from 'redux';
import { auth } from '../app/auth/reducers';
import { home } from '../app/home/reducers';

const rootReducer = combineReducers({ auth, home });

export default rootReducer;
