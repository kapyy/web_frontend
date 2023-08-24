import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { gameHttpConfig, webHttpConfig, httpConfigType } from "../config/httpConfig"

function getWebBaseUrl() {
    return webHttpConfig[process.env.NODE_ENV as httpConfigType] || webHttpConfig.production
}
function getGameBaseUrl() {
    return gameHttpConfig[process.env.NODE_ENV as httpConfigType] || gameHttpConfig.production
}
export interface IResponse {
    code: number | string;
    data: any;
    msg: string;
}
export let webHttp: AxiosInstance = axios.create({
    baseURL: getWebBaseUrl(),
    headers: {
        "Accept": "application/json",
        'Client-token': localStorage.getItem('token')// 用户token
    },
});
export let gameHttp: AxiosInstance = axios.create({
    baseURL: getGameBaseUrl(),
    headers: {
        "Accept": "application/json",
        'Client-token': localStorage.getItem('token')// 用户token
    },
});

gameHttp.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response
        } else {
            return response
        }
    },
    // 请求失败
    (error: any) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            return Promise.reject(response.data);
        } else {
            throw new Error('Parameter is not a number!');
        }
    }
)


//todo 异常情况的处理

webHttp.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response
        } else {
            return response
        }
    },
    // 请求失败
    (error: any) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            return Promise.reject(response.data);
        } else {
            throw new Error('Parameter is not a number!');
        }
    }
)


export let AuthingAxios: AxiosInstance = axios.create({
    headers: {
        "Accept": "application/json",
    },
});
//todo 异常情况的处理


export default webHttp;
