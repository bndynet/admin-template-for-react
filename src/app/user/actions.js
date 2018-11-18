import {
    ACTION_LOGIN,
    ACTION_LOGOUT,
    ACTION_GET_AUTHUSER
} from './actionTypes';

const userActions = {
    login: (username, password) => {
        return {
            type: ACTION_LOGIN,
            playload: {
                username,
                password
            },
        };
    },
    logout: () => {
        return {
            type: ACTION_LOGOUT,
            playload: null,
        };
    },
    getAuthUser: () => {
        return {
            type: ACTION_GET_AUTHUSER,
            playload: null,
        }
    }
};

export default userActions;