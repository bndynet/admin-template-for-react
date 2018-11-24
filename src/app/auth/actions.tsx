import { ACTION_LOGIN, ACTION_LOGOUT, ACTION_LOGIN_SUCCESS } from './actionTypes';

function login(username, password) {
    return {
        type: ACTION_LOGIN,
        username: username,
        password: password,
    };
}

function logout() {
    return {
        type: ACTION_LOGOUT,
        playload: null
    };
}

const userActions = {
    login,
    logout
};

export default userActions;
