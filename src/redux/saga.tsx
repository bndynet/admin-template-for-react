import { all } from 'redux-saga/effects';

import authSaga from '../app/auth/saga';
import homeSaga from '../app/home/saga';

export default function* rootSaga() {
    yield all([ authSaga(), homeSaga() ]);
}
