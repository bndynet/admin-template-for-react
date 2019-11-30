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
    link(path?: string): string {
        if (!path) {
            // eslint-disable-next-line no-undef
            return APP_ROOT;
        }

        // eslint-disable-next-line no-undef
        return `${APP_ROOT}/${path}`.replace(/\/{2}/g, '/');
    },
};

export default utils;
