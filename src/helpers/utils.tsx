const utils = {
    /**
     * Generates a random string.
     * @param length The result length
     * @returns A random string
     */
    randomString: (length: number) => {
        let result = "";
        const possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        for (let i = 0; i < length; i++) {
            result += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return result;
    },
};

export default utils;
