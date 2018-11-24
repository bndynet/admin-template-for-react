import { call, put, takeLatest } from 'redux-saga/effects';

import { ACTION_README_GET, ACTION_README_GET_SUCCESS } from './actionTypes';
import ajax from '../../helpers/ajax';

function* getReadMe(action) {
    try {
        const response = yield call(ajax.get, '/README.md');
        yield put({ type: ACTION_README_GET_SUCCESS, readme: response.data });
    } catch (e) {
        console.log(e);
    }
}

function* homeSaga() {
    yield takeLatest(ACTION_README_GET, getReadMe);
}

export default homeSaga;
