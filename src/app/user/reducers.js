import {
    combineReducers
} from 'redux';
import config from '../../config';
import {
    ACTION_LOGIN,
    ACTION_GET_AUTHUSER,
    ACTION_LOGOUT
} from './actionTypes';

const initialState = {
    user: null,
};

function auth(state = initialState, action) {
    let user = null;
    switch (action.type) {
        case ACTION_LOGIN:
            user = action.playload;
            return {...state, user};
        case ACTION_LOGOUT:
            return {...state, user};
        default:
            return state;
    }
};

const userApp = combineReducers({auth});
export default userApp;