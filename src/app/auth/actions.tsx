import { ACTION_LOGIN_REQUEST, ACTION_LOGIN_SUCCESS, ACTION_LOGOUT_REQUEST, ACTION_LOGOUT_SUCCESS } from './actionTypes';

const authActions = {
    login: (username, password, rememberMe) => ({
        type: ACTION_LOGIN_REQUEST,
        username: username,
        password: password,
        rememberMe: rememberMe,
    }),
    loginSuccess: (user) => ({
        type: ACTION_LOGIN_SUCCESS,
        user: user,
    }),
    logout: () => ({
        type: ACTION_LOGOUT_REQUEST,
    }),
    logoutSuccess: () => ({
        type: ACTION_LOGOUT_SUCCESS,
    }),
};

export default authActions;
