import { Config, AuthType } from ".";

const config: Config = {
    authType: AuthType.OAuth,
    authConfig: {
        clientId: "500bd7533a",
        clientSecret: "bc55228ce6c70e97f4ee",
        authorizationUri: "http://localhost:9100/authorize?redirect_uri={url_callback}&target=github",
        userProfileUri: "https://api.github.com/user",
        logoutUri: "https://github.com/logout",
    },
};

module.exports = config;
