import type {RequestMiddleware, ResponseErrorMiddleware, ResponseMiddleware} from './types';
import type {AxiosRequestConfig} from 'axios';

import axios from 'axios';

const baseURL = '/api';

const http = axios.create({
    baseURL,
    withCredentials: false,
    headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: 'application/json',
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
    },
});

const requestMiddleware: RequestMiddleware[] = [];
const responseMiddleware: ResponseMiddleware[] = [];
const responseErrorMiddleware: ResponseErrorMiddleware[] = [];

http.interceptors.request.use(request => {
    for (const middleware of requestMiddleware) middleware(request);

    return request;
});

http.interceptors.response.use(
    response => {
        for (const middleware of responseMiddleware) middleware(response);

        return response;
    },
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    error => {
        if (!error.response) return Promise.reject(error);
        for (const middleware of responseErrorMiddleware) middleware(error);

        return Promise.reject(error);
    },
);

/**
 * send a get request to the given endpoint
 */
export const getRequest = (endpoint: string, options?: AxiosRequestConfig) => http.get(endpoint, options);

/**
 * send a post request to the given endpoint with the given data
 */
export const postRequest = (endpoint: string, data: unknown, options?: AxiosRequestConfig) =>
    http.post(endpoint, data, options);

/**
 * send a put request to the given endpoint with the given data
 */
export const putRequest = (endpoint: string, data: unknown) => http.put(endpoint, data);

/**
 * send a delete request to the given endpoint
 */
export const deleteRequest = (endpoint: string) => http.delete(endpoint);

export const registerRequestMiddleware = (middlewareFunc: RequestMiddleware) => requestMiddleware.push(middlewareFunc);
export const registerResponseMiddleware = (middlewareFunc: ResponseMiddleware) =>
    responseMiddleware.push(middlewareFunc);
export const registerResponseErrorMiddleware = (middlewareFunc: ResponseErrorMiddleware) =>
    responseErrorMiddleware.push(middlewareFunc);
