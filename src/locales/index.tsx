import { addLocaleData } from 'react-intl';
import * as en from 'react-intl/locale-data/en';
import * as zh from 'react-intl/locale-data/zh';
import { config } from 'app/config';

addLocaleData([...en, ...zh]);

export type LocaleType = 'en' | 'zh';

export const messages = {
    en: require('./en.json'),
    zh: require('./zh.json'),
};

const clientLanguage: LocaleType = navigator.language.split(/[-_]/)[0] as LocaleType;  // language without region code

export const defaultLocale = config.defaultLocale || clientLanguage;

export const supportLocales: {[key: string]: string} = {
    en: 'English',
    zh: '中文',
};

// tslint:disable-next-line:no-console
console.info(`Locale is '${defaultLocale}'.`);
