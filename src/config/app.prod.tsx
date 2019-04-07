import config = require("./app.sso-password");

module.exports = {
    ...config,
    authConfig: {
        clientId: "188c0da703",
        clientSecret: "f3dd317369ae622113f0",
        authorizationUri: "https://cloud.bndy.net/service-sso/oauth/token",
        userProfileUri: "https://cloud.bndy.net/service-sso/oauth/me",
        logoutUri: "https://cloud.bndy.net/service-sso/login?logout",
    },
};
