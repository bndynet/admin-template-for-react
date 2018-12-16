declare const APP_NAME: string;
declare const APP_VERSION: string;
declare const APP_BUILD: string;

interface Window {
    __APP_CONF__: any;
    __APP_ENV__: string;
}
