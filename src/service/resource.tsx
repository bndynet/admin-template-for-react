import { config } from "../config";
import { Ajax } from "../helpers/ajax";
import { getState } from "./auth";

class ResourceService extends Ajax {
    constructor() {
        super({
            headerAuthorization: () => {
                if (getState().token) {
                    return `${getState().token.token_type} ${getState().token.access_token}`;
                }
                return "";
            },
            baseURL: config.resourceBaseUri,
            onResponseError: error => {
                // TODO: handle global exceptions
            },
        });
    }
}

export const service = new ResourceService();
