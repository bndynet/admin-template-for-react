export const ACTION_LOADING_SHOW = 'G_LOADING_SHOW';
export const ACTION_LOADING_HIDE = 'G_LOADING_HIDE';

export const global = (state = { loading: false }, action) => {
    switch (action.type) {
        case ACTION_LOADING_SHOW:
            return { ...state, loading: true };
        case ACTION_LOADING_HIDE:
            return { ...state, loading: false };
        default:
            return state;
    }
};

const globalActions = {
    showLoading: () => ({
        type: ACTION_LOADING_SHOW
    }),
    hideLoading: () => ({
        type: ACTION_LOADING_HIDE
    })
};

export default globalActions;
