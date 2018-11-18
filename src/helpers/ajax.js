import axios from 'axios';

export default class Ajax {

    get(url, fnOk, fnError) {
        return axios.get(url).then(response => {
            if (fnOk) fnOk(response);
        }).catch(error => {
            if (fnError) fnError(error);
        });
    }

    post(url, data, fnOK, fnError) {
        return axios.post(url, data).then(response => {
            if (fnOk) fnOk(response);
        }).catch(error => {
            if (fnError) fnError(error);
        });
    }
}