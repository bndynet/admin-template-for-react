import { all } from 'redux-saga/effects';

import { saga as authSaga } from 'app/service/auth';
import { saga as resourceSaga } from 'app/service/resource';

export default function* rootSaga() {
    yield all([ authSaga(), resourceSaga() ]);
}
