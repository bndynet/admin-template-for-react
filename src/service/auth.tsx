import { AxiosPromise } from 'axios';
import { Ajax, AjaxError } from '../helpers/ajax';
import { store } from '../redux';
import { config } from '../config';
import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as globalActions } from './global';

export const ACTION_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const ACTION_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const ACTION_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const ACTION_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const ACTION_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export const ACTION_GETUSER_REQUEST = 'USER_GETUSER_REQUEST';
export const ACTION_GETUSER_SUCCESS = 'USER_GETUSER_SUCCESS';
export const ACTION_GETUSER_FAULURE = 'USER_GETUSER_FAILURE';

export interface AuthState {
    user?: any;
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
    scope?: string;
    error?: any;
}

export interface LoginData {
    username: string;
    password: string;
    rememberMe: boolean;
    client_id?: string;
    client_secret?: string;
    grant_type?: string;
}

export interface LoginSuccessData {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

export interface UserInfo {
    username: string;
    email: string;
}

export const actions = {
    login: (data: LoginData) => ({
        type: ACTION_LOGIN_REQUEST,
        payload: data,
    }),
    loginSuccess: (response: LoginSuccessData) => ({
        type: ACTION_LOGIN_SUCCESS,
        payload: response,
    }),
    loginFailure: (error) => ({
        type: ACTION_LOGIN_FAILURE,
        payload: error,
    }),
    getUserInfo: (accessToken: string) => ({
        type: ACTION_GETUSER_REQUEST,
        payload: accessToken,
    }),
    getUserInfoSuccess: (userInfo: UserInfo) => ({
        type: ACTION_GETUSER_SUCCESS,
        payload: userInfo,
    }),
    logout: () => ({
        type: ACTION_LOGOUT_REQUEST,
    }),
    logoutSuccess: () => ({
        type: ACTION_LOGOUT_SUCCESS,
    }),
};


export function reducer(state: AuthState = {}, action): AuthState {
    switch (action.type) {
        case ACTION_LOGIN_REQUEST:
            return { ...state };
        case ACTION_LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.access_token,
                tokenType: action.payload.token_type,
                expiresIn: action.payload.expires_in,
                scope: action.payload.scope,
            };
        case ACTION_GETUSER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };
        case ACTION_LOGOUT_REQUEST:
            return { ...state, user: null };
        default:
            return state;
    }
}


export const service = {
    login: (data: LoginData) => {
        data.grant_type = 'password';
        data.client_id = config.clientId;
        data.client_secret = config.clientSecret;
        return new Ajax({
            baseURL: config.oauthBaseUri,
        }).postForm('/oauth/token', data);
    },
    getUser: (): AxiosPromise => {
        return new Ajax({
            baseURL: config.oauthBaseUri,
            headerAuthorization: () => `${store.getState().auth.tokenType} ${store.getState().auth.accessToken}`,
        }).get('/oauth/me');
    },
    logout: (): AxiosPromise => {
        return new Ajax({
            baseURL: config.oauthBaseUri,
            headerAuthorization: () => `${store.getState().auth.tokenType} ${store.getState().auth.accessToken}`,
        }).get('/login?logout');
    },
};

function* login(action) {
    try {
        // effects(call, put):
        // trigger off the code that we want to call that is asynchronous
        // and also dispatched the result from that asynchrous code.
        const loginData: LoginData = action.payload;
        yield put(globalActions.showLoading('Logging in...'));
        const loginSuccessData: LoginSuccessData = yield call(service.login, { ...loginData, client_id: config.clientId });
        yield put(actions.loginSuccess(loginSuccessData));
        yield put(actions.getUserInfo(loginSuccessData.access_token));
        yield put(globalActions.hideLoading());
        yield put(push('/admin'));
    } catch (err) {
        yield put(globalActions.hideLoading());
        if (err) {
            const ajaxError = err as AjaxError;
            yield put(globalActions.notifyError(`${ajaxError.status}: ${ajaxError.data.error_description}`));
        } else {
            yield put(globalActions.notifyError(`Service Unavailable`));
        }
        // TODO: remove in prod
        yield put(push('/admin'));
    }
}

function* logout(action) {
    try {
        yield put(globalActions.showLoading('Logging out...'));
        // request backend to terminate session
        yield call(service.logout);
        yield put(actions.logoutSuccess());
        yield put(globalActions.hideLoading());
        yield put(push('/logout'));
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function* getUser(action) {
    try {
        yield put(globalActions.showLoading('Getting user info...'));
        const response = yield call(service.getUser, '/oauth/me');
        yield put(actions.getUserInfoSuccess(response as UserInfo));
        yield put(globalActions.hideLoading());
        yield put(push('/admin'));
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

export function* saga() {
    // takeEvery:
    // listen for certain actions that are going to be dispatched and take them and run through our worker saga.
    yield takeLatest(ACTION_LOGIN_REQUEST, login);
    yield takeLatest(ACTION_LOGOUT_REQUEST, logout);
    yield takeLatest(ACTION_GETUSER_REQUEST, getUser);
}
