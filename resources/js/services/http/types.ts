import type {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';

export type RequestMiddleware = (request: AxiosRequestConfig) => void;
export type ResponseMiddleware = (response: AxiosResponse) => void;
export type ResponseErrorMiddleware = (error: AxiosResponseError) => void;

type AxiosResponseError = AxiosError<
    {
        message?: string;
        errors?: {
            [property: string]: string[];
        };
    },
    unknown
>;
