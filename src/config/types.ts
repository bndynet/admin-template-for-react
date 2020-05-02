import { UserInfo, AuthState } from 'app/service/auth';

export enum AuthType {
    OAuth = 'oauth', // alias for OAuthCode
    OAuthCode = 'oauthCode',
    OAuthPassword = 'oauthPassword',
    Custom = 'custom',
    Mock = 'mock',
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
