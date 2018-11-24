import axios from 'axios';

export const ajax = {
    get: (url) => axios.get(url),
    post: (url, data) => axios.post(url, data),
    delete: (url) => axios.delete(url),
    put: (url, data) => axios.put(url, data),
    patch: (url, data) => axios.patch(url, data),
};

export default ajax;