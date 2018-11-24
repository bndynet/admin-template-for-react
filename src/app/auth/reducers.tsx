import { ACTION_LOGIN, ACTION_LOGIN_SUCCESS, ACTION_LOGOUT } from './actionTypes';

const initialState = {
    user: null
};

export function auth(state = initialState, action) {
    let user = null;
    switch (action.type) {
        case ACTION_LOGIN:
            user = action.playload;
            return { ...state, user };
        case ACTION_LOGIN_SUCCESS:
            user = action.user;
            return { ...state, user };
        case ACTION_LOGOUT:
            return { ...state, user };
        default:
            return state;
    }
}