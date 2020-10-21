import axios from 'axios';
import config from '../config/site.config';

const api_instance = axios.create({
    baseURL: config.api_url,
    crossDomain: false
});


api_instance.interceptors.request.use(function (config) {
    try {
        if (localStorage.getItem('user')) {
            let userObject = JSON.parse(localStorage.getItem('user'));
            config.headers.Authorization = "Token " + userObject.token;
        }
        return config;
    }
    catch (e) {
        console.error(e);
    }
});

export default api_instance;