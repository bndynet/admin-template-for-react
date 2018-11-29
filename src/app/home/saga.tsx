import { call, put, takeLatest } from 'redux-saga/effects';

import { ACTION_README_GET, ACTION_README_GET_SUCCESS } from './actionTypes';
import ajax from '../../helpers/ajax';

import globalActions from '../global/actions';

function* getReadMe(action) {
    try {
        yield put(globalActions.showRequesting());
        const response = yield call(ajax.get, '/README.md');
        yield put({ type: ACTION_README_GET_SUCCESS, readme: response.data });
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
