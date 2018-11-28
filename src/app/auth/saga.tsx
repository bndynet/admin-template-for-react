import { delay } from 'redux-saga';
import { push } from 'connected-react-router';
import { call, put, takeLatest} from 'redux-saga/effects';
import { ACTION_LOGIN_REQUEST, ACTION_LOGOUT_REQUEST } from './actionTypes';
import ajax from '../../helpers/ajax';
import globalActions from '../global/actions';
import authActions from './actions';

// 1. our worker saga
function* login(action) {
    try {
        // effects(call, put):
        // trigger off the code that we want to call that is asynchronous
        // and also dispatched the result from that asynchrous code.
        yield put(globalActions.showLoading());
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
        yield put(globalActions.showLoading());
        // request backend to terminate session
        yield call(delay, 5000);
        const response = yield call(ajax.get, '/user.json?username=' + action.username);
        yield put(authActions.logoutSuccess());
        yield put(globalActions.hideLoading());
        yield put(push('/logout'));
    } catch (e) {
        console.log(e);
        yield put(globalActions.hideLoading());
    }
}

// 2. our watcher saga: spawn a new task on each ACTION
function* authSaga() {
    // takeEvery:
    // listen for certain actions that are going to be dispatched and take them and run through our worker saga.
    yield takeLatest(ACTION_LOGIN_REQUEST, login);
    yield takeLatest(ACTION_LOGOUT_REQUEST, logout);
}

export default authSaga;
