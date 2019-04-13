const storage = {
    set: (key: string, value: any) => {
        localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
    },
    get: (key: string) => {
        const result = localStorage.getItem(key);
        if (result && (result.startsWith("[") || result.startsWith("{"))) {
            return JSON.parse(result);
        } else {
            return result;
        }
    },
    setSession: (key: string, value: any) => {
        sessionStorage.setItem(key, typeof value === "object" ? JSON.stringify(value) : value);
    },
    getSession: (key: string) => {
        const result = sessionStorage.getItem(key);
        if (result && (result.startsWith("[") || result.startsWith("{"))) {
            return JSON.parse(result);
        } else {
            return result;
        }
    },
};

export default storage;
