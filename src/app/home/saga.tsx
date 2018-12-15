import { call, put, takeLatest } from 'redux-saga/effects';

import { ACTION_README_GET, ACTION_README_GET_SUCCESS } from './actionTypes';

import globalActions from '../global/actions';
import resourceAjax from '../services/resourceAjax';

function* getReadMe(action) {
    try {
        yield put(globalActions.showRequesting());
        const response = yield call(resourceAjax.get, '/README.md');
        yield put({ type: ACTION_README_GET_SUCCESS, readme: response});
        yield put(globalActions.hideRequesting());
    } catch (e) {
        console.log(e);
        yield put(globalActions.hideRequesting());
    }
}

function* homeSaga() {
    yield takeLatest(ACTION_README_GET, getReadMe);
}

export default homeSaga;
