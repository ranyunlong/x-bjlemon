import axios, { AxiosRequestConfig } from 'axios';
import Qs from 'qs';

/**
 * 用户center中心
 */
export const center = axios.create({
    baseURL: '/bjlemon'
})


/**
 * 基础请求
 */
export const http = axios.create({
    baseURL: '/xbjlemon'
})


/**
 * 基础请求拦截处理
 */
http.interceptors.request.use((options) => {
    if (options.method === 'post') {
        options.headers['Content-Type'] = "application/x-www-form-urlencoded";
        options.data = Qs.stringify(options.data);
    }
    return options;
})


/**
 * 基础请求拦截处理
 */
center.interceptors.request.use((options: AxiosRequestConfig) => {
    if (options.method === 'post') {
        options.headers['Content-Type'] = "application/x-www-form-urlencoded";
        options.data = Qs.stringify(options.data);
    }
    return options;
})