import config = require('./app.mock');
module.exports = config;

// import _merge from 'lodash-es/merge';
// import config = require('./app.oauth-code');
// module.exports = _merge(config, {
//     authConfig: {
//         clientId: '188c0da703',
//         clientSecret: 'f3dd317369ae622113f0',
//         authorizationUri:
//             'https://cloud.bndy.net/service-sso/oauth/authorize?response_type=code&client_id={clientId}&redirect_uri={callbackUri}&scope={scope}',
//         accessTokenUri:
//             'https://cloud.bndy.net/service-sso/oauth/token?client_id={clientId}&client_secret={clientSecret}&grant_type=authorization_code&code={code}&redirect_uri={callbackUri}',
//         userProfileUri: 'https://cloud.bndy.net/service-sso/oauth/me',
//         logoutUri: 'https://cloud.bndy.net/service-sso/oauth/logout',
//     },
// });
