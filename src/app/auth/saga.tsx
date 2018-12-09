import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ACTION_LOGIN_REQUEST, ACTION_LOGOUT_REQUEST, ACTION_GETUSER_REQUEST, LoginSuccessData } from '.';
import globalActions from '../global/actions';
import { LoginData, UserInfo } from '.';
import authActions from './actions';
import config from '../../config';
import oauthAjax from '../services/oauthAjax';

function* login(action) {
    try {
        // effects(call, put):
        // trigger off the code that we want to call that is asynchronous
        // and also dispatched the result from that asynchrous code.
        const loginData: LoginData = action.payload;
        yield put(globalActions.showLoading('Logging in...'));
        const response = yield call(oauthAjax.login, { ...loginData, client_id: config.clientId });
        const responseTokenEntity = response.data as LoginSuccessData;
        yield put(authActions.loginSuccess(responseTokenEntity));
        yield put(authActions.getUserInfo(responseTokenEntity.access_token));
        yield put(globalActions.hideLoading());
        yield put(push('/admin'));
    } catch (e) {
        console.error(e);
        yield put(globalActions.hideLoading());
        yield put(globalActions.notifyError('Login error: OAuth service unavailable!'));
        // TODO: remove in prod
        yield put(push('/admin'));
    }
}

function* logout(action) {
    try {
        yield put(globalActions.showLoading('Logging out...'));
        // request backend to terminate session
        yield call(oauthAjax.logout);
        yield put(authActions.logoutSuccess());
        yield put(globalActions.hideLoading());
        yield put(push('/logout'));
    } catch (e) {
        console.log(e);
        yield put(globalActions.hideLoading());
    }
}

function* getUser(action) {
    try {
        yield put(globalActions.showLoading('Getting user info...'));
        const response = yield call(oauthAjax.getUser, '/oauth/me');
        yield put(authActions.getUserInfoSuccess(response.data as UserInfo));
        yield put(globalActions.hideLoading());
        yield put(push('/admin'));
    } catch (e) {
        console.log(e);
        yield put(globalActions.hideLoading());
    }
}

function* authSaga() {
    // takeEvery:
    // listen for certain actions that are going to be dispatched and take them and run through our worker saga.
    yield takeLatest(ACTION_LOGIN_REQUEST, login);
    yield takeLatest(ACTION_LOGOUT_REQUEST, logout);
    yield takeLatest(ACTION_GETUSER_REQUEST, getUser);
}

export default authSaga;
