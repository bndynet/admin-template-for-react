import {
    ACTION_LOGIN_REQUEST,
    ACTION_LOGIN_SUCCESS,
    ACTION_LOGOUT_REQUEST,
    ACTION_LOGOUT_SUCCESS,
    ACTION_GETUSER_REQUEST,
    ACTION_GETUSER_SUCCESS,
    LoginData,
    LoginSuccessData,
    UserInfo,
    ACTION_LOGIN_FAILURE
} from '.';

const authActions = {
    login: (data: LoginData) => ({
        type: ACTION_LOGIN_REQUEST,
        payload: data
    }),
    loginSuccess: (response: LoginSuccessData) => ({
        type: ACTION_LOGIN_SUCCESS,
        payload: response
    }),
    loginFailure: (error) => ({
        type: ACTION_LOGIN_FAILURE,
        payload: error
    }),
    getUserInfo: (accessToken: string) => ({
        type: ACTION_GETUSER_REQUEST,
        payload: accessToken
    }),
    getUserInfoSuccess: (userInfo: UserInfo) => ({
        type: ACTION_GETUSER_SUCCESS,
        payload: userInfo
    }),
    logout: () => ({
        type: ACTION_LOGOUT_REQUEST
    }),
    logoutSuccess: () => ({
        type: ACTION_LOGOUT_SUCCESS
    })
};

export default authActions;
