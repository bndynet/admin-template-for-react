/* eslint-disable */
import { AxiosPromise } from 'axios';
import { Ajax, AjaxError } from '../helpers/ajax';
import { store } from '../redux';
import { getConfig, AuthType } from '../config';
import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import { actions as globalActions } from './global';
import { Url } from 'app/helpers/url';
import storage from 'app/helpers/storage';
import utils from 'app/helpers/utils';

export const KEY_TOKEN = 'token';

export const ACTION_AUTH_REQUEST = 'USER_AUTH_REQUEST';
export const ACTION_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const ACTION_AUTH_FAILURE = 'USER_AUTH_FAILURE';

export const ACTION_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const ACTION_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const ACTION_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

export const ACTION_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const ACTION_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const ACTION_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE';

export const ACTION_GETUSER_REQUEST = 'USER_GETUSER_REQUEST';
export const ACTION_GETUSER_SUCCESS = 'USER_GETUSER_SUCCESS';
export const ACTION_GETUSER_FAULURE = 'USER_GETUSER_FAILURE';

export interface UserInfo {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
}

export interface AuthState {
    user?: UserInfo;
    token?: TokenInfo;
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

export interface TokenInfo {
    access_token: string;
    refresh_token?: string;
    token_type?: string;
    expires_in?: number;
    scope?: string;
}

export const actions = {
    authSuccess: (tokenInfo: TokenInfo) => ({
        type: ACTION_AUTH_SUCCESS,
        payload: tokenInfo,
    }),
    login: (data: LoginData) => ({
        type: ACTION_LOGIN_REQUEST,
        payload: data,
    }),
    loginSuccess: (response: TokenInfo) => ({
        type: ACTION_LOGIN_SUCCESS,
        payload: response,
    }),
    loginFailure: error => ({
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
        case ACTION_AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload,
            };

        case ACTION_LOGIN_REQUEST:
            return { ...state };
        case ACTION_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
            };
        case ACTION_GETUSER_SUCCESS:
            return {
                ...state,
                user: action.payload,
            };

        case ACTION_LOGOUT_SUCCESS:
            return { ...state, user: null, token: null };

        default:
            return state;
    }
}

const config = getConfig();

export const service = {
    login: (data: LoginData) => {
        switch (config.authType) {
            case AuthType.OAuthPassword:
                data.grant_type = 'password';
                data.client_id = config.authConfig.clientId;
                data.client_secret = config.authConfig.clientSecret;
                return new Ajax().postForm(
                    config.authConfig.authorizationUri,
                    data,
                );

            case AuthType.Mock:
                return new Promise((resolve, reject) => {
                    const token: TokenInfo = {
                        access_token: JSON.stringify(data),
                    };
                    storage.set(KEY_TOKEN, token);
                    resolve(token);
                });

            default:
                return new Promise((resolve, reject) => {
                    const error: AjaxError = {
                        data: {
                            error_description: `No handler found for ${
                                config.authType
                            }`,
                        },
                        status: 404,
                        statusText: 'No `AuthType` matched.',
                        headers: null,
                        config: null,
                        request: null,
                    };
                    reject(error);
                });
        }
    },
    getUser: (): AxiosPromise | any => {
        if (config.authType === AuthType.Mock) {
            return new Promise((resolve, reject) => {
                const user: UserInfo = JSON.parse(
                    getState().token.access_token,
                ) as UserInfo;
                resolve(user);
            });
        }
        return new Ajax({
            headerAuthorization: () =>
                `${getState().token.token_type || 'Bearer'} ${
                    getState().token.access_token
                }`,
        }).get(config.authConfig.userProfileUri);
    },
    logout: (): AxiosPromise | any => {
        if (config.authType === AuthType.Mock) {
            return new Promise((resolve, reject) => {
                storage.remove(KEY_TOKEN);
                resolve('ok');
            });
        }
        if (config.logoutHandler) {
            return config.logoutHandler(
                config.authConfig.logoutUri,
                getState(),
            );
        } else {
            return new Ajax({
                headerAuthorization: () => {
                    if (getState().token) {
                        return `${getState().token.token_type} ${
                            getState().token.access_token
                        }`;
                    }
                    return '';
                },
            }).remove(config.authConfig.logoutUri);
        }
    },
};

function* auth() {
    yield put(globalActions.showLoading('Redirecting to authorize...'));
}

function* authSuccess(action) {
    yield put(actions.getUserInfo(action.payload));
}

function* login(action) {
    try {
        // effects(call, put):
        // trigger off the code that we want to call that is asynchronous
        // and also dispatched the result from that asynchrous code.
        const loginData: LoginData = action.payload;
        yield put(globalActions.showLoading('Logging in...'));
        const tokenInfo: TokenInfo = yield call(service.login, {
            ...loginData,
        });
        yield put(actions.loginSuccess(tokenInfo));
        yield put(actions.getUserInfo(tokenInfo.access_token));
        yield put(globalActions.hideLoading());
        yield put(push('/admin'));
    } catch (err) {
        yield put(globalActions.hideLoading());
        if (err) {
            const ajaxError = err as AjaxError;
            yield put(
                globalActions.notifyError(
                    `${ajaxError.status}: ${ajaxError.data.error_description}`,
                ),
            );
        } else {
            yield put(globalActions.notifyError(`Service Unavailable`));
        }
    }
}

function* logout(action) {
    yield put(actions.logoutSuccess());
}

function* getUser(action) {
    try {
        yield put(globalActions.showLoading('Getting user info...'));
        const response = yield call(service.getUser);
        const userInfo: UserInfo =
            typeof config.userConverter === 'function'
                ? config.userConverter(response)
                : { ...response };
        yield put(actions.getUserInfoSuccess(userInfo));
        yield put(globalActions.hideLoading());
        yield put(push('/admin'));
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

export function* saga() {
    // takeEvery:
    // listen for certain actions that are going to be dispatched and take them and run through our worker saga.
    yield takeLatest(ACTION_AUTH_REQUEST, auth);
    yield takeLatest(ACTION_AUTH_SUCCESS, authSuccess);
    yield takeLatest(ACTION_LOGIN_REQUEST, login);
    yield takeLatest(ACTION_LOGOUT_REQUEST, logout);
    yield takeLatest(ACTION_GETUSER_REQUEST, getUser);
}

export function getState(): AuthState {
    return store.getState().auth as AuthState;
}

export function isAuthorized(): boolean {
    if (config.authType === AuthType.Mock) {
        let token: TokenInfo = storage.get(KEY_TOKEN);
        if (token) {
            let user = JSON.parse(token.access_token);
            if (config.userConverter) {
                user = config.userConverter(user);
            }
            const state = getState();
            state.token = token;
            state.user = user;
        }
    }
    return !!getState().token;
}

export function getAuthUri(): string {
    if (
        config.authType === AuthType.Custom ||
        config.authType === AuthType.OAuthPassword ||
        config.authType === AuthType.Mock
    ) {
        return '/login';
    }

    if (
        config.authType === AuthType.OAuth ||
        config.authType === AuthType.OAuthCode
    ) {
        let authUrl = config.authConfig.authorizationUri;
        if (!config.authConfig.callbackUri) {
            const callbackUri = Url.current().merge('/auth/callback');
            authUrl = authUrl.replace('{callbackUri}', callbackUri);
        }

        Object.keys(config.authConfig).forEach(key => {
            authUrl = authUrl.replace(`{${key}}`, config.authConfig[key]);
        });

        return `${authUrl}&state=${getValidState()}`;
    }
}

export function getValidState(): string {
    const KEY_AUTH_STATE = 'AUTH_STATE';
    if (!storage.getSession(KEY_AUTH_STATE)) {
        storage.setSession(KEY_AUTH_STATE, utils.randomString(10));
    }

    return storage.getSession(KEY_AUTH_STATE);
}

export function getAccessTokenUri(code: string): string {
    if (
        config.authType === AuthType.OAuth ||
        config.authType === AuthType.OAuthCode
    ) {
        let tokenUrl = config.authConfig.accessTokenUri;
        tokenUrl = tokenUrl.replace('{code}', code);
        if (!config.authConfig.callbackUri) {
            const callbackUri = Url.current().merge('/auth/callback');
            tokenUrl = tokenUrl.replace('{callbackUri}', callbackUri);

            Object.keys(config.authConfig).forEach(key => {
                tokenUrl = tokenUrl.replace(`{${key}}`, config.authConfig[key]);
            });
        }
        return tokenUrl;
    }
}
