import axios, { AxiosRequestConfig } from 'axios';
import Qs from 'qs';

export const center = axios.create({
    baseURL: '/bjlemon'
})

export const http = axios.create({
    baseURL: '/xbjlemon'
})

http.interceptors.request.use((options) => {
    if (options.method === 'post') {
        options.headers['Content-Type'] = "application/x-www-form-urlencoded";
        options.data = Qs.stringify(options.data);
    }
    return options;
})

center.interceptors.request.use((options: AxiosRequestConfig) => {
    if (options.method === 'post') {
        options.headers['Content-Type'] = "application/x-www-form-urlencoded";
        options.data = Qs.stringify(options.data);
    }
    return options;
})