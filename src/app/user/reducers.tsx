import { combineReducers } from 'redux';
import { ACTION_LOGIN, ACTION_LOGOUT } from './actionTypes';

const initialState = {
    user: null
};

function auth(state = initialState, action) {
    let user = null;
    switch (action.type) {
        case ACTION_LOGIN:
            user = action.playload;
            return { ...state, user };
        case ACTION_LOGOUT:
            return { ...state, user };
        default:
            return state;
    }
}

export const userApp = combineReducers({ auth });
