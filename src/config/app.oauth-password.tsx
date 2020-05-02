import { Config, AuthType } from './types';

export const config: Config = {
    authType: AuthType.OAuthPassword,
    authConfig: {
        clientId: 'foo',
        clientSecret: '1',
        authorizationUri: 'http://localhost:9110/oauth/token',
        userProfileUri: 'http://localhost:9110/oauth/me',
        logoutUri: 'http://localhost:9110/oauth/logout',
        // authorizationUri: "https://cloud.bndy.net/service-sso/oauth/token",
        // userProfileUri: "https://cloud.bndy.net/service-sso/oauth/me",
        // logoutUri: "https://cloud.bndy.net/service-sso/oauth/logout",
    },
    userConverter: (backendUser: any) => {
        return {
            name: backendUser.username,
            email: backendUser.email,
        };
    },
};
