import { Config } from './types';

export const config: Config = {
    title: 'admin.brand',
    logoUri: 'https://static.bndy.net/images/logo_white.svg',
    resourceBaseUri: APP_BASEHREF || '/',
    defaultLocale: 'zh-CN', // empty to use navigator language
    locales: [
        {
            name: 'English',
            value: 'en-US',
            // uncomment that will load locale file(file name format: en-US.json) via ajax
            messages: require('../../assets/locales/json/en-US.json'),
        },
        {
            name: '简体中文',
            value: 'zh-CN',
            messages: require('../../assets/locales/json/zh-CN.json'),
        },
    ],
};
