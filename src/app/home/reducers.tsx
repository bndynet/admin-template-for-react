import { ACTION_README_GET_SUCCESS } from './actionTypes';

export function home(state = {}, action) {
    switch (action.type) {
        case ACTION_README_GET_SUCCESS:
            const readme = action.readme;
            return { ...state, readme};
        default:
            return state;
    }
}