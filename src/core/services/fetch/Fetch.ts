import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios, {
    AxiosRequestConfig as requestConfig,
    ResponseType as responseType,
    RawAxiosRequestHeaders as headers,
    AxiosResponse as response,
    AxiosError as error
} from "axios";

import { api, timeout } from "../Configuration";
import messages from "./Messages.json";

export type query = Record<string, string | string[] | null | undefined>;
export type methods = "GET" | "PUT" | "DELETE" | "POST";
export type messageKey = keyof typeof messages;

export type fetchArgs<P = undefined> = {
    urlPath: string;
    method?: methods;
    query?: query;
    payload?: P;
    redirectUrl?: string;
    error?: string;
};

export type RequestConfig<P = undefined> = {
    headers?: headers;
    responseType?: responseType;
    timeout?: number;
} & fetchArgs<P>;

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
        responseType: config.responseType ?? "json",
        timeout: (config.timeout ?? timeout) * 1000
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

export const errorMessage = <R, P>(error: error<R, P>): string => {
    console.log("Request Config: ", error.config);

    if (error.response) {
        // The request was made and the server responded with a status code hat falls out of the range of 2xx
        console.log("Status: ", error.response.status);
        console.log("Data: ", error.response.data);
        console.log("Headers: ", error.response.headers);

        const key = error.response.status.toString() as messageKey;
        return messages[key] ?? messages.error;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Request", error.request);

        const timeout = error.code === "ECONNABORTED";
        return timeout ? messages.timeout : messages[404];
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        return error.message;
    }
};

export const useMessages = () => {
    const { enqueueSnackbar } = useSnackbar();

    const success = (key: methods) => {
        const message = messages[`success-${key}` as keyof typeof messages];
        message && enqueueSnackbar(message, { variant: "success" });
    };

    const error = (message: string) => {
        enqueueSnackbar(message, { variant: "error" });
    };

    return { success, error };
};

export const useRouter = () => {
    const navigate = useNavigate();

    const redirect = (url: string, replace: boolean = true) => {
        setTimeout(() => navigate(url, { replace }), 100);
    };

    return redirect;
};

export const useApi = <R = undefined, P = undefined>(
    config: RequestConfig<P>
): (() => Promise<response<R, P> | void>) => {
    const { success, error } = useMessages();
    const navigate = useRouter();

    return async () =>
        axios<R, response<R, P>, P>(request(config))
            .then((res) => {
                config.method && success(config.method);
                config.redirectUrl && navigate(config.redirectUrl);
                Promise.resolve(res);
            })
            .catch((err) => {
                error(config.error || errorMessage(err));
                Promise.reject(err);
            });
};

export const useGet = <R>(config: fetchArgs): (() => Promise<R | void>) => {
    const get = useApi<R>({ ...config, method: config.method || "GET" });
    return async () => get().then((res) => Promise.resolve(res?.data));
};

export const useUpdate = <R, P>(
    config: fetchArgs<P>
): (() => Promise<R | void>) => {
    const update = useApi<R, P>({ ...config, method: config.method || "POST" });
    return async () => update().then((res) => Promise.resolve(res?.data));
};

export const useAdd = <R, P>(
    config: fetchArgs<P>
): (() => Promise<R | void>) => {
    const add = useApi<R, P>({ ...config, method: config.method || "PUT" });
    return async () => add().then((res) => Promise.resolve(res?.data));
};

export const useDelete = <R = undefined>(
    config: fetchArgs
): (() => Promise<R | void>) => {
    const del = useApi<R>({ ...config, method: config.method || "DELETE" });
    return async () => del().then((res) => Promise.resolve(res?.data));
};

export const useFetcher = <R, P>(config: fetchArgs<P>) => {
    const [data, setData] = useState<R>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetch = useApi<R, P>(config);

    const load = useCallback(() => {
        setLoading(true);

        fetch()
            .then((res) => {
                setData(res?.data);
                setLoading(false);
                setError(false);
            })
            .catch((err) => {
                setLoading(false);
                setError(true);
                console.log(err.message);
            });
    }, [fetch]);

    useEffect(load, [load]);

    return { data, loading, error, refresh: () => load() };
};
