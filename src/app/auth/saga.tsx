import { call, put, takeLatest } from 'redux-saga/effects';
import { ACTION_LOGIN_SUCCESS, ACTION_LOGIN } from './actionTypes';
import ajax from '../../helpers/ajax';

// 1. our worker saga
function* login(action) {
    try {
        // effects(call, put):
        // trigger off the code that we want to call that is asynchronous
        // and also dispatched the result from that asynchrous code.
        const response = yield call(ajax.get, '/user.json?username=' + action.username);
        yield put({ type: ACTION_LOGIN_SUCCESS, user: response.data });
    } catch (e) {
        console.log(e);
    }
}

// 2. our watcher saga: spawn a new task on each ACTION
function* authSaga() {
    // takeEvery:
    // listen for certain actions that are going to be dispatched and take them and run through our worker saga.
    yield takeLatest(ACTION_LOGIN, login);
}

export default authSaga;
