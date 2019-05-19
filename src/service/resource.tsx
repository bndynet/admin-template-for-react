import { notify } from '@bndynet/dialog';
import { config } from '../config';
import { Ajax } from '../helpers/ajax';
import { getState } from './auth';

class ResourceService extends Ajax {
    public constructor() {
        super({
            headerAuthorization: () => {
                if (getState().token) {
                    return `${getState().token.token_type} ${
                        getState().token.access_token
                    }`;
                }
                return '';
            },
            baseURL: config.resourceBaseUri,
            onResponseError: error => {
                notify(JSON.stringify(error), 'error');
            },
        });
    }
}

export const service = new ResourceService();
