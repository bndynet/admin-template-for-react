import { delay } from 'redux-saga';
import { push } from 'connected-react-router';
import { call, put, takeLatest} from 'redux-saga/effects';
import { ACTION_LOGIN_REQUEST, ACTION_LOGOUT_REQUEST } from './actionTypes';
import ajax from '../../helpers/ajax';
import globalActions from '../global/actions';
import authActions from './actions';

function* login(action) {
    try {
        // effects(call, put):
        // trigger off the code that we want to call that is asynchronous
        // and also dispatched the result from that asynchrous code.
        yield put(globalActions.showLoading('Logging in...'));
        yield call(delay, 3000);
        const response = yield call(ajax.get, '/user.json?username=' + action.username);
        yield put(authActions.loginSuccess(response.data));
        yield put(globalActions.hideLoading());
        yield put(push('/admin'));
    } catch (e) {
        console.log(e);
        yield put(globalActions.hideLoading());
    }
}

function* logout(action) {
    try {
        yield put(globalActions.showLoading('Logging out...'));
        // request backend to terminate session
        const response = yield call(ajax.get, '/user.json?username=' + action.username);
        yield put(authActions.logoutSuccess());
        yield call(delay, 3000);
        yield put(globalActions.hideLoading());
        yield put(push('/logout'));
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
}

export default authSaga;
