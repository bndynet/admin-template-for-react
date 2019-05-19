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
    deplay<T>(seconds: number, promise: Promise<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (promise) {
                    promise.then(
                        (res: T) => {
                            resolve(res);
                        },
                        (err: any) => {
                            reject(err);
                        },
                    );
                }
            }, seconds * 1000);
        });
    },
};

export default utils;
