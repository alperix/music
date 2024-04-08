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

import { api, timeout, pageSize } from "../Configuration";
import { emitEvent } from "../events/CustomEvents";

import messages from "./Messages.json";

export type query = Record<
    string,
    string | string[] | number | boolean | null | undefined
>;
export type methods = "GET" | "PUT" | "DELETE" | "POST";
export type messageKey = keyof typeof messages;
export type order = "asc" | "desc";

export type fetchHandler<R = undefined> = {
    event?: string;
    navigate?: string;
    message?: string;
    callback?: (value: R) => void;
};

export type fetchArgs<R = undefined, P = undefined> = {
    urlPath: string;
    method?: methods;
    query?: query;
    payload?: P;
    timeout?: number;
    success?: fetchHandler<R>;
    error?: fetchHandler<error<R, P>>;
};

export type RequestConfig<R = undefined, P = undefined> = {
    headers?: headers;
    responseType?: responseType;
} & fetchArgs<R, P>;

export type Page<R> = {
    content: R[];
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    numberOfElements: number;
    first: boolean;
    last: boolean;
    empty: boolean;
};

export type PagerArgs = {
    page?: number;
    size?: number;
    order?: order;
    orderBy?: string;
    search?: string;
    args?: query;
    disabled?: boolean;
};

export const defaultPage = {
    content: [],
    first: false,
    last: false,
    empty: false,
    number: 0,
    numberOfElements: 0,
    size: 0,
    totalElements: 0,
    totalPages: 0
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

export const request = <R, P>(
    config: RequestConfig<R, P>,
    payload?: P
): requestConfig<P> => {
    const url = `${api}/${config.urlPath}${urlParams(config.query)}`;

    const req: requestConfig<P> = {
        url: url,
        method: config.method ?? "GET",
        data: payload ?? config.payload,
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
        console.log("Response: ", error.response);
        const key = error.response.status.toString() as messageKey;
        return messages[key] ?? messages.error;
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
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

    const success = (message: string) => {
        message && enqueueSnackbar(message, { variant: "success" });
    };

    const error = (message: string) => {
        message && enqueueSnackbar(message, { variant: "error" });
    };

    return { success, error };
};

export const useRouter = () => {
    const navigate = useNavigate();

    const redirect = (url: string, replace = true) => {
        setTimeout(() => navigate(url, { replace }), 100);
    };

    return redirect;
};

export const useApi = <R = undefined, P = undefined>(
    config: RequestConfig<R, P>
): ((p?: P) => Promise<response<R, P> | void>) => {
    const { success, error } = useMessages();
    const navigate = useRouter();

    return async (payload?: P) =>
        axios<R, response<R, P>, P>(request(config, payload))
            .then((res) => {
                console.log(res);

                let message = "";

                if (config.method)
                    message = messages[config.method as messageKey];
                if (config.success?.message) message = config.success.message;

                success(message);

                config.success?.callback && config.success.callback(res.data);
                config.success?.event &&
                    emitEvent(config.success.event, res.data);
                config.success?.navigate && navigate(config.success.navigate);

                Promise.resolve(res);
            })
            .catch((err) => {
                console.log(err);

                let message = errorMessage(err);

                if (config.error?.message) message = config.error.message;

                error(message);

                config.error?.callback && config.error.callback(err);
                config.error?.event && emitEvent(config.error.event, err);
                config.error?.navigate && navigate(config.error.navigate);

                Promise.reject(err);
            });
};

export const useGet = <R>(config: fetchArgs<R>): (() => Promise<R | void>) => {
    const get = useApi<R>({ ...config, method: config.method || "GET" });
    return async () => get().then((res) => Promise.resolve(res?.data));
};

export const useDelete = <R = undefined>(
    config: fetchArgs<R>
): (() => Promise<R | void>) => {
    const del = useApi<R>({ ...config, method: config.method || "DELETE" });
    return async () => del().then((res) => Promise.resolve(res?.data));
};

export const useAdd = <P, R = undefined>(
    config: fetchArgs<R, P>
): ((p?: P) => Promise<R | void>) => {
    const add = useApi<R, P>({ ...config, method: config.method || "PUT" });
    return async (payload?: P) =>
        add(payload).then((res) => Promise.resolve(res?.data));
};

export const useUpdate = <P, R = undefined>(
    config: fetchArgs<R, P>
): ((p?: P) => Promise<R | void>) => {
    const update = useApi<R, P>({ ...config, method: config.method || "POST" });
    return async (payload?: P) =>
        update(payload).then((res) => Promise.resolve(res?.data));
};

export const useFetcher = <R, P = undefined>(config: fetchArgs<R, P>) => {
    const [data, setData] = useState<R>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetch = useApi<R, P>(config);

    const load = useCallback(() => {
        setLoading(true);

        fetch()
            .then((res) => {
                setData(res?.data);
                setError(false);
            })
            .catch((err) => {
                setError(true);
                console.log(err.message);
            })
            .finally(() => setLoading(false));
    }, [fetch]);

    useEffect(load, [load]);

    return { data, loading, error, refresh: () => load() };
};

export const usePager = <R>(url: string, config?: PagerArgs) => {
    const [query, setQuery] = useState<PagerArgs>({
        page: config?.page ?? 0,
        size: config?.size ?? pageSize,
        order: config?.order ?? "desc",
        orderBy: config?.orderBy ?? "createdAt",
        search: config?.search ?? "",
        args: config?.args ?? {}
    });

    const setters = {
        page: (page: number) => setQuery({ ...query, page }),
        size: (size: number) => setQuery({ ...query, size }),
        search: (search: string) => setQuery({ ...query, search }),
        args: (args: query) => setQuery({ ...query, ...args }),

        sort: (orderBy: string, order?: order) => {
            let orb = query.orderBy;
            let ord = query.order;

            if (orb === orderBy) {
                ord = order ? order : ord === "asc" ? "desc" : "asc";
            } else {
                orb = orderBy;
                ord = order ? order : "desc";
            }

            setQuery({ ...query, order: ord, orderBy: orb });
        }
    };

    const { data, loading, error, refresh } = useFetcher<Page<R>>({
        urlPath: url,
        method: "GET",
        query: {
            page: query.page,
            size: query.size,
            sort: [query.orderBy ?? "createdAt", query.order ?? "desc"],
            search: query.search,
            ...query.args
        }
    });

    return {
        data: data ?? defaultPage,
        query,
        setters,
        loading,
        error,
        refresh
    };
};
