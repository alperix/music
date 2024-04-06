import axios, {
    AxiosRequestConfig as requestConfig,
    Method as method,
    ResponseType as responseType,
    RawAxiosRequestHeaders as headers,
    AxiosResponse as response,
    AxiosError as error
} from "axios";

import { api } from "./Configuration";

export type query = Record<string, string | string[] | null | undefined>;

export type RequestConfig<P = undefined> = {
    method: method;
    urlPath: string;
    query?: query;
    payload?: P;
    headers?: headers;
    responseType?: responseType;
};

export const contentTypeHeader = <P>(payload: P) => {
    let value = "application/json; charset=utf-8";

    if (typeof payload === "string" || payload instanceof String)
        value = "text/plain; charset=utf-8";

    if (payload instanceof FormData) {
        const files = [...payload.values()].some((v) => v instanceof File);
        value = files
            ? "multipart/form-data"
            : "application/x-www-form-urlencoded";
    }

    return { "content-type": value };
};

export const request = <P>(config: RequestConfig<P>): requestConfig<P> => {
    const url = `${api}/${config.urlPath}${urlParams(config.query)}`;

    const req: requestConfig<P> = {
        url: url,
        method: config.method ?? "GET",
        data: config.payload,
        headers: { ...contentTypeHeader(config.payload), ...config.headers },
        responseType: config.responseType ?? "json"
    };

    return req;
};

export const urlParams = (query: query | null | undefined) => {
    if (!query || Object.keys(query).length) return "";

    const args = Object.keys(query).reduce((args, key) => {
        const v = query[key];
        if (!v) return args;
        const value = Array.isArray(v) ? v.join(",") : v;
        args.push(encodeURIComponent(`${key}=${value}`));
        return args;
    }, [] as string[]);

    return `?${args.join("&")}`;
};

export const fetch = async <R, P>(
    config: RequestConfig<P>
): Promise<response<R, P> | void> => {
    return axios<R, response<R, P>, P>(request(config))
        .then((res) => Promise.resolve(res))
        .catch(err => {
            errorHandler(err);
            Promise.reject(err);
        });
};

export const errorHandler = <R, P>(err: error<R, P>) => {
    console.log(err.message);
}

