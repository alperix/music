import { api } from "./Configuration";

export type query = Record<string, string | string[] | null | undefined>;
export type RequestConfig<B = null> = Omit<RequestInit, "body"> & {
    body?: B;
    path?: string;
    urlParams?: query;
};

export const defaultHeaders = (json: boolean) =>
    json && { "Content-Type": "application/json" };

export const requestConfig = <B = null>(
    config: RequestConfig<B>
): RequestInit => {
    const json = !(config.body instanceof FormData);

    const options = {
        ...config,
        method: config.method ?? "GET",
        headers: {
            ...defaultHeaders(json),
            ...config?.headers
        }
    } as RequestInit;

    if (json) options.body = JSON.stringify(config.body);

    return options;
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

export const request = <B = null>(
    config: RequestConfig<B>
): Promise<Response> => {
    return fetch(
        `${api}/${config.path}${urlParams(config.urlParams)}`,
        requestConfig(config)
    );
};
