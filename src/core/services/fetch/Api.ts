import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

import { emitEvent } from "../events/CustomEvents";
import { fetch, requestConfig, error, response } from "./Fetch";
import messages from "./Messages.json";

export type messageKey = keyof typeof messages;

export type handler<R = undefined> = {
    event?: string;
    navigate?: string;
    message?: string;
    callback?: (value: R | undefined) => void;
};

export type fetchHandlers<R = undefined, P = undefined> = {
    success?: handler<R>;
    error?: handler<error<R, P>>;
};

export type apiConfig<R = undefined, P = undefined> = requestConfig<P> &
    fetchHandlers<R, P>;

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

export const useApi = <R = undefined, P = undefined>(): ((
    config: apiConfig<R, P>
) => Promise<response<R, P> | void>) => {
    const { success, error } = useMessages();
    const navigate = useRouter();

    return async (config: apiConfig<R, P>) =>
        fetch<R, P>(config)
            .then((res: response<R, P>) => {
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
            .catch((err: error<R, P>) => {
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

export const useGet = <R>(): ((c: apiConfig<R>) => Promise<R | void>) => {
    const get = useApi<R>();

    return async (c: apiConfig<R>) => {
        const config = { ...c, method: c.method || "GET" };
        return get(config).then((res) => Promise.resolve(res?.data));
    };
};

export const useDelete = <R = undefined>(): ((
    c: apiConfig<R>
) => Promise<R | void>) => {
    const del = useApi<R>();

    return async (c: apiConfig<R>) => {
        const config = { ...c, method: c.method || "DELETE" };
        return del(config).then((res) => Promise.resolve(res?.data));
    };
};

export const useAdd = <P, R = undefined>(): ((
    c: apiConfig<R, P>
) => Promise<R | void>) => {
    const put = useApi<R, P>();

    return async (c: apiConfig<R, P>) => {
        const config = { ...c, method: c.method || "PUT" };
        return put(config).then((res) => Promise.resolve(res?.data));
    };
};

export const useUpdate = <P, R = undefined>(): ((
    c: apiConfig<R, P>
) => Promise<R | void>) => {
    const post = useApi<R, P>();

    return async (c: apiConfig<R, P>) => {
        const config = { ...c, method: c.method || "POST" };
        return post(config).then((res) => Promise.resolve(res?.data));
    };
};
