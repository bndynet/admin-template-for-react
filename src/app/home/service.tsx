import config from '../../config';
import { Ajax } from '../../helpers/ajax';

class ResourceService extends Ajax {
    constructor() {
        super({
            baseURL: config.resourceBaseUri,
            onResponseError: (error) => {
                console.warn('TODO: handle global exception for response!');
            },
        });
    }
}

const service = new ResourceService();

export default service;
