import { Config, AuthType } from './types';

const config: Config = {
    authType: AuthType.OAuth,
    authConfig: {
        clientId: '500bd7533a',
        clientSecret: 'bc55228ce6c70e97f4ee',
        authorizationUri:
            'http://localhost:9100/authorize?redirect_uri={callbackUri}&target=github',
        // clientId: "eb6ab71a97ef2692d857",
        // clientSecret: "014e9f84049964807d751c81658d133a1e37acd3",
        // authorizationUri: "https://cloud.bndy.net/service-oauth/authorize?redirect_uri={callbackUri}&target=github",
        userProfileUri: 'https://api.github.com/user',
        logoutUri: 'https://github.com/logout',
    },
    userConverter: (backendUser: any) => {
        return {
            name: backendUser.name,
            email: backendUser.email,
            avatar: backendUser.avatar_url,
            // TODO: here to map more backend user informations
        };
    },
    logoutHandler: (url: string) => {
        window.location.href = url;
        return;
    },
};

module.exports = config;
