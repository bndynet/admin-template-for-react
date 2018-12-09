import { Ajax } from "../../helpers/ajax";
import config from "../../config";

class ResourceAjax extends Ajax {
    constructor() {
        super({
            baseURL: config.resourceBaseURL,
            onResponseError: (error) => {
                console.warn('TODO: handle global exception for response!');
            }
        });
    }
}

const resourceAjax = new ResourceAjax();

export default resourceAjax;