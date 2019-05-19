import { all } from 'redux-saga/effects';

import { saga as authSaga } from 'app/service/auth';

export default function* rootSaga() {
    yield all([authSaga()]);
}
