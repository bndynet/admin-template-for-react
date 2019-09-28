import { Config } from '.';

const config: Config = {
    title: 'admin.brand',
    logoUri: 'https://static.bndy.net/images/logo_white.svg',
    resourceBaseUri: '/',
    defaultLocale: 'zh-CN', // empty to use navigator language
    locales: [
        {
            name: 'English',
            value: 'en-US',
            // uncomment that will load locale file(file name format: en-US.json) via ajax
            messages: require('../../assets/locales/en-US.json'),
        },
        {
            name: '简体中文',
            value: 'zh-CN',
            messages: require('../../assets/locales/zh-CN.json'),
        },
    ],
};

module.exports = config;
