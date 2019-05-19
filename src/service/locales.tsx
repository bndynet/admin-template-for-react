import * as intl from "react-intl-universal";
import { config } from "app/config";
import storage from "app/helpers/storage";
import ajax from "app/helpers/ajax";
import { onLocaleChanged } from "../app.events";

const KEY_LOCALE = "locale";
function getCurrentLocale() {
    return storage.getCookie(KEY_LOCALE) || config.defaultLocale || navigator.language;
}

export function setLocale(currentLocale?: string, callback?: () => void) {
    initLocales(currentLocale, callback);
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
            onLocaleChanged();
            if (callback) {
                callback();
            }
        });
    };
    if (locales[currentLocale]) {
        initIntl(locales);
    } else {
        // load messages from remote file if the messages not specified in service/locales.tsx
        ajax.get(`locales/${currentLocale}.json`).then(messages => {
            initIntl({
                [currentLocale]: messages,
            });
        });
    }
}

// tslint:disable-next-line:no-console
console.info(`Locale is '${getCurrentLocale()}'.`);
