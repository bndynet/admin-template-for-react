import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';
import _merge from 'lodash-es/merge';

export type AjaxOptions = {
    baseURL?: string;
    headers?: object;
    headerAuthorization?: string | (() => string);
    isPostForm?: boolean;
    onRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    onRequestError?: (error) => void;
    onResponse?: (response: any) => any;
    onResponseError?: (error) => any;
};
export class Ajax {
    static buildOptions(options: AjaxOptions): AxiosRequestConfig {
        let config: AxiosRequestConfig;

        if (!options) return config;

        if (options.baseURL) {
            config.baseURL = options.baseURL;
        }
        if (options.headerAuthorization) {
            config.headers.common['Authorization'] =
                typeof options.headerAuthorization === 'string'
                    ? options.headerAuthorization
                    : options.headerAuthorization();
        }
        if (options.headers) {
            for (let key in options.headers) {
                config.headers.common[key] = options.headers[key];
            }
        }
        if (options.isPostForm) {
            config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        return config;
    }

    static setGlobalOptions(options: AjaxOptions) {
        axios.defaults = _merge({}, axios.defaults, Ajax.buildOptions(options));
    }

    options: AjaxOptions;
    instance: AxiosInstance;

    constructor(options?: AjaxOptions) {
        this.options = options;
        this.instance = this.options ? axios.create(Ajax.buildOptions(options)) : axios.create();

        if (options) {
            if (options.onRequest || options.onRequestError) {
                this.instance.interceptors.request.use(
                    options.onRequest || ((config: AxiosRequestConfig) => config),
                    options.onRequestError || ((error: any) => Promise.reject(error))
                );
            }
            if (options.onResponse || options.onResponseError) {
                this.instance.interceptors.response.use(
                    options.onResponse || ((response: any) => response),
                    options.onResponseError || ((error: any) => Promise.reject(error))
                );
            }
        }
    }

    get = (url: string): AxiosPromise => this.instance.get(url) as AxiosPromise;
    post = (url: string, data: any): AxiosPromise => this.instance.post(url, data);
    remove = (url: string): AxiosPromise => this.instance.delete(url);
    put = (url: string, data: any): AxiosPromise => this.instance.put(url, data);
    patch = (url: string, data: any): AxiosPromise => this.instance.patch(url, data);
}

const ajax = new Ajax();

export default ajax;
