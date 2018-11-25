export const ACTION_LOADING_SHOW = 'G_LOADING_SHOW';
export const ACTION_LOADING_HIDE = 'G_LOADING_HIDE';
export const ACTION_NOTIFICATION_SHOW = 'G_NOTIFICATION_SHOW';
export const ACTION_NOTIFICATION_HIDE = 'G_NOTIFICATION_HIDE';

export const global = (state = { loading: false }, action) => {
    switch (action.type) {
        case ACTION_LOADING_SHOW:
            return { ...state, loading: true };
        case ACTION_LOADING_HIDE:
            return { ...state, loading: false };
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
    showLoading: () => ({
        type: ACTION_LOADING_SHOW
    }),
    hideLoading: () => ({
        type: ACTION_LOADING_HIDE
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
