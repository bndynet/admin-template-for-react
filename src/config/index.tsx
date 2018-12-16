import _merge from 'lodash-es/merge';

// Uncomment or define it in index.html to specify your environment.
// window.__APP_ENV__ = 'your env'

export interface Config {
    clientId?: string;
    clientSecret?: string;
    oauthBaseURL?: string;
    resourceBaseURL?: string;
}

const getConfig = (): Config => {
    const env = window.__APP_ENV__ || process.env.NODE_ENV;

    // eslint-disable-next-line no-console
    /*eslint no-console: "error"*/
    // tslint:disable-next-line:no-console
    console.info(`Application is running in ${env} mode.`);

    switch (env) {
        case 'production':
            return (window.__APP_CONF__ = _merge(require('./app.common'), require('./app.prod')));

        case 'development':
            return (window.__APP_CONF__ = _merge(require('./app.common'), require('./app.dev')));

        // more cases you can define here.

        default:
            console.warn('No environment mode found.');
            return (window.__APP_CONF__ = require('./app.common'));
    }
};

const config = getConfig();

export default config;
export { default as routes } from './routes';
