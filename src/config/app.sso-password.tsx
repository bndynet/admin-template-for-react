import { Config, AuthType } from ".";

const config: Config = {
    authType: AuthType.OAuthPassword,
    authConfig: {
        clientId: "500bd7533a",
        clientSecret: "bc55228ce6c70e97f4ee",
        authorizationUri: "http://localhost:9110/oauth/token",
        userProfileUri: "http://localhost:9110/oauth/me",
        logoutUri: "http://localhost:9110/login?logout",
        // clientId: "188c0da703",
        // clientSecret: "f3dd317369ae622113f0",
        // authorizationUri: "https://cloud.bndy.net/service-sso/oauth/token",
        // userProfileUri: "https://cloud.bndy.net/service-sso/oauth/me",
        // logoutUri: "https://cloud.bndy.net/service-sso/login?logout",
    },
    userConverter: (backendUser: any) => {
        return {
            name: backendUser.username,
            email: backendUser.email,
        };
    },
};

module.exports = config;
