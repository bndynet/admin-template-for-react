import config = require("./app.oauth-code");

module.exports = {
    ...config,
    authConfig: {
        authorizationUri: "https://cloud.bndy.net/service-sso/oauth/authorize?response_type=code&client_id={clientId}&redirect_uri={callbackUri}&&scope={scope}",
        accessTokenUri: "https://cloud.bndy.net/service-sso/oauth/token?client_id={clientId}&client_secret={clientSecret}&grant_type=authorization_code&code={code}&redirect_uri={callbackUri}",
        userProfileUri: "https://cloud.bndy.net/service-sso/oauth/me",
        logoutUri: "https://cloud.bndy.net/service-sso/oauth/logout",
    },
};
