import { Ajax } from "../../helpers/ajax";
import config from "../../config";

class ResourceService extends Ajax {
    constructor() {
        super({
            baseURL: config.resourceBaseURL,
            onResponseError: (error) => {
                console.warn('TODO: handle global exception for response!');
            }
        });
    }
}

const service = new ResourceService();

export default service;