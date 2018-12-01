import { NotifierOptions } from "../common/Notifier";

export const ACTION_LOADING_SHOW = 'G_LOADING_SHOW';
export const ACTION_LOADING_HIDE = 'G_LOADING_HIDE';
export const ACTION_NOTIFIER_SHOW = 'G_NOTIFIER_SHOW';
export const ACTION_NOTIFIER_HIDE = 'G_NOTIFIER_HIDE';
export const ACTION_REQUESTING_SHOW = 'G_REQUESTING_SHOW';
export const ACTION_REQUESTING_HIDE = 'G_REQUESTING_HIDE';
export const ACTION_THEME_CHANGE = 'G_THEME_CHANGE';

export const global = (state = { loading: false }, action) => {
    switch (action.type) {
        case ACTION_LOADING_SHOW:
            const { loadingText } = action.payload;
            return { ...state, loading: true, loadingText };
        case ACTION_LOADING_HIDE:
            return { ...state, loading: false };

        case ACTION_REQUESTING_SHOW:
            return { ...state, requesting: true };
        case ACTION_REQUESTING_HIDE:
            return { ...state, requesting: false};

        case ACTION_NOTIFIER_SHOW:
            const notifierOptions = action.notifierOptions;
            return { ...state, showNotifier: true, notifierOptions };
        case ACTION_NOTIFIER_HIDE:
            return { ...state, showNotifier: false };

        case ACTION_THEME_CHANGE:
            return {...state, theme: action.theme };

        default:
            return state;
    }
};

const globalActions = {
    showLoading: (text?: string) => ({
        type: ACTION_LOADING_SHOW,
        payload: {
            loadingText: text || 'Loading...',
        },
    }),
    hideLoading: () => ({
        type: ACTION_LOADING_HIDE,
    }),

    showRequesting: () => ({
        type: ACTION_REQUESTING_SHOW,
    }),
    hideRequesting: () => ({
        type: ACTION_REQUESTING_HIDE,
    }),

    notify: (notifierOptions: NotifierOptions) => ({
        type: ACTION_NOTIFIER_SHOW,
        notifierOptions: notifierOptions,
    }),
    notifyInfo: (message: string) => ({
        type: ACTION_NOTIFIER_SHOW,
        notifierOptions: {
            message: message,
            variant: 'info',
        },
    }),
    notifySuccess: (message: string) => ({
        type: ACTION_NOTIFIER_SHOW,
        notifierOptions: {
            message: message,
            variant: 'success',
        },
    }),
    notifyWarning: (message: string) => ({
        type: ACTION_NOTIFIER_SHOW,
        notifierOptions: {
            message: message,
            variant: 'warning',
        },
    }),
    notifyError: (message: string) => ({
        type: ACTION_NOTIFIER_SHOW,
        notifierOptions: {
            message: message,
            variant: 'error',
        },
    }),
    unnotify: () => ({
        type: ACTION_NOTIFIER_HIDE,
    }),

    changeTheme: (theme) => ({
        type: ACTION_THEME_CHANGE,
        theme: theme,
    }),
};

export default globalActions;
