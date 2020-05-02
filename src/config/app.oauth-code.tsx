import { Config, AuthType } from './types';

export const config: Config = {
    authType: AuthType.OAuth,
    authConfig: {
        clientId: 'foo',
        clientSecret: '1',
        authorizationUri:
            'http://localhost:9110/oauth/authorize?response_type=code&client_id={clientId}&redirect_uri={callbackUri}&&scope={scope}',
        accessTokenUri:
            'http://localhost:9110/oauth/token?client_id={clientId}&client_secret={clientSecret}&grant_type=authorization_code&code={code}&redirect_uri={callbackUri}',
        userProfileUri: 'http://localhost:9110/oauth/me',
        logoutUri: 'http://localhost:9110/oauth/logout',
        // clientId: "188c0da703",
        // clientSecret: "f3dd317369ae622113f0",
        // authorizationUri: "https://cloud.bndy.net/service-sso/oauth/authorize?response_type=code&client_id={clientId}&redirect_uri={callbackUri}&&scope={scope}",
        // accessTokenUri: "https://cloud.bndy.net/service-sso/oauth/token?client_id={clientId}&client_secret={clientSecret}&grant_type=authorization_code&code={code}&redirect_uri={callbackUri}",
        // userProfileUri: "https://cloud.bndy.net/service-sso/oauth/me",
        // logoutUri: "https://cloud.bndy.net/service-sso/oauth/logout",
        scope: 'user_info',
    },
    userConverter: (backendUser: any) => {
        return {
            name: backendUser.username,
            email: backendUser.email,
        };
    },
};
