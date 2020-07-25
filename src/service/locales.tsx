import * as intl from 'react-intl-universal';
import { getConfig } from 'app/config';
import storage from 'app/helpers/storage';
import ajax from 'app/helpers/ajax';
import { onAppLocaleChanged } from '../app.events';

const config = getConfig();
const KEY_LOCALE = 'locale';
function getCurrentLocale() {
    return (
        storage.getCookie(KEY_LOCALE) ||
        config.defaultLocale ||
        navigator.language
    );
}

export function initLocales(currentLocale?: string, callback?: () => void) {
    if (currentLocale) {
        storage.setCookie(KEY_LOCALE, currentLocale);
    } else {
        storage.removeCookie(KEY_LOCALE);
    }
    currentLocale = currentLocale || getCurrentLocale();
    const locales = {};
    config.locales.forEach(item => {
        locales[item.value] = item.messages;
    });

    const initIntl = l => {
        intl.init({
            currentLocale,
            fallbackLocale: config.locales[0].value,
            locales: l,
        }).then(() => {
            onAppLocaleChanged();
            if (callback) {
                callback();
            }
        });
    };
    if (locales[currentLocale]) {
        initIntl(locales);
    } else {
        // load messages from remote file if the messages not specified in service/locales.tsx
        ajax.get(`locales/json/${currentLocale}.json`).then(messages => {
            initIntl({
                [currentLocale]: messages,
            });
        });
    }
}

export function setLocale(currentLocale?: string, callback?: () => void) {
    initLocales(currentLocale, callback);
}

// eslint-disable-next-line no-console
console.info(`Locale is '${getCurrentLocale()}'.`);
