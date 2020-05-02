import _merge from 'lodash-es/merge';
import { Config } from './types';
import { config as commonConfig } from './app.common';
import { config as prodConfig } from './app.prod';
import { config as mockConfig } from './app.mock';

// Uncomment or define it in index.html to specify your environment.
// window.__APP_ENV__ = 'github';

let config: Config;
export function getConfig(): Config {
    if (config) {
        return config;
    }

    const env = window.__APP_ENV__ || process.env.NODE_ENV;

    // eslint-disable-next-line no-console
    console.info(`Application is running in '${env}' mode.`);

    switch (env) {
        case 'production':
            config = window.__APP_CONF__ = _merge(commonConfig, prodConfig);
            break;

        case 'development':
            config = window.__APP_CONF__ = _merge(commonConfig, mockConfig);
            break;

        default:
            config = window.__APP_CONF__ = _merge(
                require('./app.common'),
                require(`./app.${env}`),
            );
            break;
    }
    return config;
}

export * from './types';
export { default as adminRoutes } from './routes.admin';
export { default as adminMenus } from './menus.admin';
export { default as userMenus } from './menus.user';
