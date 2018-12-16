import { AuthState, ACTION_LOGIN_REQUEST, ACTION_LOGIN_SUCCESS, ACTION_LOGOUT_REQUEST, ACTION_GETUSER_SUCCESS } from '.';

export function auth(state: AuthState = {}, action): AuthState {
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
