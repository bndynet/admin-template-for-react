import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosPromise,
    AxiosResponse,
    AxiosError,
} from 'axios';
import _merge from 'lodash-es/merge';

export interface AjaxOptions {
    baseURL?: string;
    headers?: object;
    headerAuthorization?: string | (() => string);
    onRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    onRequestError?: (error) => void;
    onResponse?: (response: any) => any;
    onResponseError?: (error) => any;
}

export type AjaxError = AxiosResponse;

export class Ajax {
    public static setGlobalOptions(options: AjaxOptions) {
        axios.defaults = _merge({}, axios.defaults, Ajax.buildOptions(options));
    }

    private static buildOptions(options: AjaxOptions): AxiosRequestConfig {
        if (!options) {
            return null;
        }

        const config: AxiosRequestConfig = {};
        if (options.baseURL) {
            config.baseURL = options.baseURL;
        }
        if (options.headerAuthorization) {
            if (!config.headers) {
                config.headers = {};
            }
            if (!config.headers.common) {
                config.headers.common = {};
            }
            const authorization =
                typeof options.headerAuthorization === 'string'
                    ? options.headerAuthorization
                    : options.headerAuthorization();
            const keyAuthorization = 'Authorization';
            config.headers.common[keyAuthorization] = authorization;
        }
        if (options.headers) {
            if (!config.headers) {
                config.headers = {};
            }
            if (!config.headers.common) {
                config.headers.common = {};
            }
            for (const key of Object.keys(options.headers)) {
                config.headers.common[key] = options.headers[key];
            }
        }
        return config;
    }

    private static instance(options?: AjaxOptions): AxiosInstance {
        const result: AxiosInstance = options
            ? axios.create(Ajax.buildOptions(options))
            : axios.create();

        if (options) {
            if (options.onRequest || options.onRequestError) {
                result.interceptors.request.use(
                    options.onRequest ||
                        ((config: AxiosRequestConfig) => config),
                    options.onRequestError ||
                        ((error: any) => Promise.reject(error)),
                );
            }
            if (options.onResponse || options.onResponseError) {
                result.interceptors.response.use(
                    options.onResponse || ((response: any) => response),
                    options.onResponseError ||
                        ((error: any) => Promise.reject(error)),
                );
            }
        }

        result.interceptors.response.use(
            (response: AxiosResponse) => response.data,
            (error: AxiosError) => Promise.reject(error.response),
        );

        return result;
    }

    private options: AjaxOptions;

    public constructor(options?: AjaxOptions) {
        this.options = options;
    }

    public instance = (): AxiosInstance => Ajax.instance(this.options);

    public get = (url: string): AxiosPromise => {
        return this.instance().get(url) as AxiosPromise;
    };
    public post = (url: string, data: any): AxiosPromise => {
        return this.instance().post(url, data);
    };
    public postForm = (url: string, data: any): AxiosPromise => {
        const formData = new FormData(); // Must be FormData so that the ajax request will be Form post
        Object.keys(data).forEach(k => {
            formData.append(k, data[k]);
        });
        return this.instance().post(url, formData);
    };
    public remove = (url: string): AxiosPromise => {
        return this.instance().delete(url);
    };
    public put = (url: string, data: any): AxiosPromise => {
        return this.instance().put(url, data);
    };
    public patch = (url: string, data: any): AxiosPromise => {
        return this.instance().patch(url, data);
    };
}

const ajax = new Ajax();

export default ajax;
