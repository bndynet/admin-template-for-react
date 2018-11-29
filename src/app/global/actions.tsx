export const ACTION_LOADING_SHOW = 'G_LOADING_SHOW';
export const ACTION_LOADING_HIDE = 'G_LOADING_HIDE';
export const ACTION_NOTIFICATION_SHOW = 'G_NOTIFICATION_SHOW';
export const ACTION_NOTIFICATION_HIDE = 'G_NOTIFICATION_HIDE';
export const ACTION_REQUESTING_SHOW = 'G_REQUESTING_SHOW';
export const ACTION_REQUESTING_HIDE = 'G_REQUESTING_HIDE';

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

        case ACTION_NOTIFICATION_SHOW:
            const notificaton = action.notification;
            return { ...state, showNotification: true, notificaton };
        case ACTION_NOTIFICATION_HIDE:
            return { ...state, showNotification: false };
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

    notify: (notification: {message: string, variant?: string, duration?: number, placement?: string}) => ({
        type: ACTION_NOTIFICATION_SHOW,
        notification: notification,
    }),
    notifyInfo: (message: string) => ({
        type: ACTION_NOTIFICATION_SHOW,
        notification: {
            message: message,
            variant: 'info',
        },
    }),
    notifySuccess: (message: string) => ({
        type: ACTION_NOTIFICATION_SHOW,
        notification: {
            message: message,
            variant: 'success',
        },
    }),
    notifyWarning: (message: string) => ({
        type: ACTION_NOTIFICATION_SHOW,
        notification: {
            message: message,
            variant: 'warning',
        },
    }),
    notifyError: (message: string) => ({
        type: ACTION_NOTIFICATION_SHOW,
        notification: {
            message: message,
            variant: 'error',
        },
    }),
    hideNotification: () => ({
        type: ACTION_NOTIFICATION_HIDE
    }),
};

export default globalActions;
