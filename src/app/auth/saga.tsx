import { push } from 'connected-react-router';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ACTION_LOGIN_REQUEST, ACTION_LOGOUT_REQUEST, ACTION_GETUSER_REQUEST, LoginSuccessData, LoginData, UserInfo } from '.';
import globalActions from '../global/actions';
import authActions from './actions';
import authService from './service';
import config from '../../config';
import { AjaxError } from '../../helpers/ajax';

function* login(action) {
    try {
        // effects(call, put):
        // trigger off the code that we want to call that is asynchronous
        // and also dispatched the result from that asynchrous code.
        const loginData: LoginData = action.payload;
        yield put(globalActions.showLoading('Logging in...'));
        const loginSuccessData: LoginSuccessData = yield call(authService.login, { ...loginData, client_id: config.clientId });
        yield put(authActions.loginSuccess(loginSuccessData));
        yield put(authActions.getUserInfo(loginSuccessData.access_token));
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
        yield call(authService.logout);
        yield put(authActions.logoutSuccess());
        yield put(globalActions.hideLoading());
        yield put(push('/logout'));
    } catch (e) {
        yield put(globalActions.hideLoading());
    }
}

function* getUser(action) {
    try {
        yield put(globalActions.showLoading('Getting user info...'));
        const response = yield call(authService.getUser, '/oauth/me');
        yield put(authActions.getUserInfoSuccess(response as UserInfo));
        yield put(globalActions.hideLoading());
        yield put(push('/admin'));
    } catch (e) {
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
