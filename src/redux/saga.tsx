import { all } from 'redux-saga/effects';

import homeSaga from '../app/home/saga';

import { saga as authSaga } from '../service/auth';

export default function* rootSaga() {
    yield all([ authSaga(), homeSaga() ]);
}
