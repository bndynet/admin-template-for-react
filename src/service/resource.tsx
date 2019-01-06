import { call, put, takeLatest } from "redux-saga/effects";
import { config } from "../config";
import { Ajax } from "../helpers/ajax";
import { actions as globalActions } from "./global";

export const ACTION_README_GET = "README_GET";
export const ACTION_README_GET_SUCCESS = "README_GET_SUCCESS";

export const actions = {
    getReadme: () => ({
        type: ACTION_README_GET,
    }),
};

export function reducer(state = {}, action) {
    switch (action.type) {
        case ACTION_README_GET_SUCCESS:
            const readme = action.readme;
            return { ...state, readme };
        default:
            return state;
    }
}

class ResourceService extends Ajax {
    constructor() {
        super({
            baseURL: config.resourceBaseUri,
            onResponseError: error => {
                // TODO: handle global exceptions
            },
        });
    }
}

export const service = new ResourceService();

function* getReadMe(action) {
    try {
        yield put(globalActions.showRequesting());
        const response = yield call(service.get, "/README.md");
        yield put({ type: ACTION_README_GET_SUCCESS, readme: response });
        yield put(globalActions.hideRequesting());
    } catch (e) {
        yield put(globalActions.hideRequesting());
    }
}

export function* saga() {
    yield takeLatest(ACTION_README_GET, getReadMe);
}
