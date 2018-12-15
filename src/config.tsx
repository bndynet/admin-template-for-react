import _merge from 'lodash-es/merge';

let config = {
    clientId: '500bd7533a',
    clientSecret: 'bc55228ce6c70e97f4ee',
    oauthBaseURL: 'http://localhost:9110/',
    resourceBaseURL: '/',
};

switch(process.env.MODE_ENV) {
    case 'production':
        config = _merge(config, {
            clientId: '188c0da703',
            clientSecret: 'f3dd317369ae622113f0',
            oauthBaseURL: 'http://cloud.bndy.net/service-sso/',
        });
        break;
}

export default config;
