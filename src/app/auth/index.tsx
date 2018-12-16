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
