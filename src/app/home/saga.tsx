import { call, put, takeLatest } from 'redux-saga/effects';

import { ACTION_README_GET, ACTION_README_GET_SUCCESS } from './actionTypes';

import { actions as globalActions } from '../../service/global';
import homeService from './service';

function* getReadMe(action) {
    try {
        yield put(globalActions.showRequesting());
        const response = yield call(homeService.get, '/README.md');
        yield put({ type: ACTION_README_GET_SUCCESS, readme: response});
        yield put(globalActions.hideRequesting());
    } catch (e) {
        yield put(globalActions.hideRequesting());
    }
}

function* homeSaga() {
    yield takeLatest(ACTION_README_GET, getReadMe);
}

export default homeSaga;
