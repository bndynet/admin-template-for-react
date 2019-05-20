import * as intl from 'react-intl-universal';
import { setup as dialogSetup } from '@bndynet/dialog';
import { getCurrentTheme } from './theme';
import { initLocales } from './service/locales';

function getDialogOptions(options?: any) {
    return {
        labelOK: intl.get('ok'),
        labelCancel: intl.get('cancel'),
        ...options,
    };
}

export function onAppLocaleChanged() {
    dialogSetup(getDialogOptions());
}

export function onAppThemeChanged(isDark: boolean) {
    if (isDark) {
        dialogSetup(
            getDialogOptions({
                theme: isDark ? 'dialog-dark' : '',
            }),
        );
    } else {
        document.body.classList.remove('dialog-dark');
    }
}

export interface AppInitCallbacks {
    localeDone: () => void;
}

function onAppLocaleInit(done: () => void) {
    initLocales(null, done);
}

function onAppThemeInit() {
    const themeConfig = getCurrentTheme();
    onAppThemeChanged(themeConfig.palette.type === 'dark');
}

export function onAppInit(callbacks: AppInitCallbacks) {
    onAppThemeInit();
    onAppLocaleInit(callbacks.localeDone);
    dialogSetup(getDialogOptions());
}
