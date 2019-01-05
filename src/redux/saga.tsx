import { all } from 'redux-saga/effects';

import { saga as authSaga } from '../service/auth';
import { saga as resourceSaga } from '../service/resource';

export default function* rootSaga() {
    yield all([ authSaga(), resourceSaga() ]);
}
