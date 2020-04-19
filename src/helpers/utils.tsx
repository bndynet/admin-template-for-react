import { renderRoutes, RouteConfig } from 'react-router-config';

const utils = {
    /**
     * Generates a random string.
     * @param length The result length
     * @returns A random string
     */
    randomString(length: number) {
        let result = '';
        const possible =
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let i = 0; i < length; i++) {
            result += possible.charAt(
                Math.floor(Math.random() * possible.length),
            );
        }
        return result;
    },
    /**
     * Deplays to execute a promise like ajax call.
     * @param seconds The delay seconds
     * @param promise The promise to delay
     * @returns A promise
     */
    delay(seconds: number, ...promises: Promise<any>[]): Promise<any[]> {
        return Promise.all([
            ...promises,
            new Promise(presolve => setTimeout(presolve, seconds * 1000)),
        ]);
    },
    /**
     * Overwrites existing method
     * @param routes The route config
     */
    renderRoutes(routes: RouteConfig[]): JSX.Element {
        // const baseHref = document.querySelector('head > base')
        //     ? document.querySelector('head > base').getAttribute('href')
        //     : '';

        // routes.forEach((route: RouteConfig) => {
        //     if (
        //         typeof route.path === 'string' &&
        //         baseHref &&
        //         route.path.indexOf(baseHref) < 0
        //     ) {
        //         route.path = baseHref ? baseHref + route.path : route.path;
        //         route.path = route.path.replace(/\/+/g, '/');
        //     }
        // });
        // console.debug(routes);
        return renderRoutes(routes);
    },
};

export default utils;
