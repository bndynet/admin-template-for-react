import _merge from 'lodash-es/merge';
import { UserInfo, AuthState } from 'app/service/auth';

// Uncomment or define it in index.html to specify your environment.
// window.__APP_ENV__ = 'github';

export enum AuthType {
    OAuth, // alias for OAuthCode
    OAuthCode,
    OAuthPassword,
    Custom,
    Mock,
}

export interface Config {
    title?: string;
    logoUri?: string;
    resourceBaseUri?: string;
    defaultLocale?: string;
    locales?: { name: string; value: string; messages?: any }[];
    authType?: AuthType;
    authConfig?: OAuthConfig;
    userConverter?: (backendUser: any) => UserInfo;
    logoutHandler?: (url: string, authState: AuthState) => void;
}

export interface OAuthConfig {
    clientId: string;
    clientSecret: string;
    authorizationUri: string;
    accessTokenUri?: string;
    userProfileUri: string;
    logoutUri: string;
    callbackUri?: string;
    scope?: string;
}

const getConfig = (): Config => {
    const env = window.__APP_ENV__ || process.env.NODE_ENV;

    // eslint-disable-next-line no-console
    console.info(`Application is running in '${env}' mode.`);

    switch (env) {
        case 'production':
            return (window.__APP_CONF__ = _merge(
                require('./app.common'),
                require('./app.dev'),
                require('./app.prod'),
            ));

        case 'development':
            return (window.__APP_CONF__ = _merge(
                require('./app.common'),
                require('./app.dev'),
            ));

        default:
            return (window.__APP_CONF__ = _merge(
                require('./app.common'),
                require(`./app.${env}`),
            ));
    }
};

export const config = getConfig();
export { default as routes } from './routes';
export { default as adminRoutes } from './routes.admin';
export { default as adminMenus } from './menus.admin';
export { default as userMenus } from './menus.user';
