import { AxiosPromise } from 'axios';
import { LoginData } from '.';
import { Ajax } from '../../helpers/ajax';
import config from '../../config';
import store from '../../redux/store';

const service = {
    login: (data: LoginData) => {
        data.grant_type = 'password';
        data.client_id = config.clientId;
        data.client_secret = config.clientSecret;
        return new Ajax({
            baseURL: config.oauthBaseURL
        }).postForm('/oauth/token', data);
    },
    getUser: (): AxiosPromise => {
        return new Ajax({
            baseURL: config.oauthBaseURL,
            headerAuthorization: () => `${store.getState().auth.tokenType} ${store.getState().auth.accessToken}`,
        }).get('/oauth/me');
    },
    logout: (): AxiosPromise => {
        return new Ajax({
            baseURL: config.oauthBaseURL,
            headerAuthorization: () => `${store.getState().auth.tokenType} ${store.getState().auth.accessToken}`,
        }).get('/login?logout');
    }
};

export default service;
