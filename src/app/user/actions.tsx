import { ACTION_LOGIN, ACTION_LOGOUT } from './actionTypes';

function login(username, password) {
    return {
        type: ACTION_LOGIN,
        playload: {
            username,
            password
        }
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
