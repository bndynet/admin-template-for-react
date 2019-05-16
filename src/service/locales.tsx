import { config } from "app/config";
import storage from "app/helpers/storage";

export const KEY_LOCALE = "locale";

export const supportedLocales: Array<{ name: string; value: string; messages?: any }> = [
    {
        name: "English",
        value: "en-US",
        // uncomment that will load locale file(file name format: en-US.json) via ajax
        messages: require("../../assets/locales/en-US.json"),
    },
    {
        name: "简体中文",
        value: "zh-CN",
        messages: require("../../assets/locales/zh-CN.json"),
    },
];

const defaultLocale = config.defaultLocale || navigator.language;
export function getCurrentLocale() {
    return storage.getCookie(KEY_LOCALE) || defaultLocale;
}

// tslint:disable-next-line:no-console
console.info(`Locale is '${getCurrentLocale()}'.`);
