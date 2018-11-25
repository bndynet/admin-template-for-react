import { ACTION_LOGIN_REQUEST, ACTION_LOGIN_SUCCESS, ACTION_LOGOUT_REQUEST } from './actionTypes';

const initialState = {
    user: null
};

export function auth(state = initialState, action) {
    let user = null;
    switch (action.type) {
        case ACTION_LOGIN_REQUEST:
            const loading = true;
            return { ...state, loading };
        case ACTION_LOGIN_SUCCESS:
            user = action.user;
            return { ...state, user };
        case ACTION_LOGOUT_REQUEST:
            return { ...state, user };
        default:
            return state;
    }
}