export interface CookieAttribute {
    path?: string;
    domain?: string;
    expires?: number | Date | string;
}

const storage = {
    set: (key: string, value: any) => {
        localStorage.setItem(
            key,
            typeof value === 'object' ? JSON.stringify(value) : value,
        );
    },
    get: (key: string) => {
        const result = localStorage.getItem(key);
        if (result && (result.startsWith('[') || result.startsWith('{'))) {
            return JSON.parse(result);
        } else {
            return result;
        }
    },
    remove: (key: string) => {
        localStorage.removeItem(key);
    },

    setSession: (key: string, value: any) => {
        sessionStorage.setItem(
            key,
            typeof value === 'object' ? JSON.stringify(value) : value,
        );
    },
    getSession: (key: string) => {
        const result = sessionStorage.getItem(key);
        if (result && (result.startsWith('[') || result.startsWith('{'))) {
            return JSON.parse(result);
        } else {
            return result;
        }
    },

    setCookie: (key: string, value: any, attributes?: CookieAttribute) => {
        if (typeof document === 'undefined') {
            return;
        }

        attributes = {
            path: '/',
            ...attributes,
        };

        if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(
                new Date().getTime() + attributes.expires * 1000,
            );
        }

        // using "exipres" because "max-age" is not supported by IE
        attributes.expires = attributes.expires
            ? (attributes.expires as Date).toUTCString()
            : '';

        try {
            const result = JSON.stringify(value);
            // eslint-disable-next-line no-useless-escape
            if (/^[\{\[]/.test(result)) {
                value = result;
            }
        } catch (e) {
            // nothing to do
        }

        value = encodeURIComponent(String(value)).replace(
            /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
            decodeURIComponent,
        );
        key = encodeURIComponent(String(key))
            .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
            // eslint-disable-next-line no-useless-escape
            .replace(/[\(\)]/g, escape);

        let stringifiedAttributes = '';
        for (const attributeName in attributes) {
            if (!attributes[attributeName]) {
                continue;
            }

            stringifiedAttributes += ';' + attributeName;
            if (attributes[attributeName] === true) {
                continue;
            }

            // Considers RFC 6265 section 5.2:
            // ...
            // 3.  If the remaining unparsed-attributes contains a %x3B (";")
            //     character:
            // Consume the characters of the unparsed-attributes up to,
            // not including, the first %x3B (";") character.
            // ...
            stringifiedAttributes +=
                '=' + attributes[attributeName].split(';')[0];
        }

        return (document.cookie = key + '=' + value + stringifiedAttributes);
    },

    getCookie: (key: string) => {
        let result: any;
        if (typeof document === 'undefined') {
            return;
        }

        const decode = (s: string) =>
            s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        let index = 0;
        for (; index < cookies.length; index++) {
            const arr = cookies[index].split('=');
            const name = arr[0];
            if (key === name) {
                result = arr.slice(1).join('=');
                try {
                    result = JSON.parse(decode(result));
                } catch (e) {
                    // nothing to do
                }
                break;
            }
        }
        return result;
    },

    removeCookie: (key: string, attributes?: any) => {
        storage.setCookie(key, '', {
            ...attributes,
            expires: -1,
        });
    },
};

export default storage;
