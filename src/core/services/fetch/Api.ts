import { useEffect, useRef, useState } from "react"
import { fetch, error, response, fetchConfig } from "./Fetch"
import { apiConfig, useFetchHandlers } from "./Handlers"

export const useApi = <R = undefined, P = undefined>(): ((
    config: apiConfig<R, P>
) => Promise<R | void>) => {
    const { success, error } = useFetchHandlers<R, P>()

    const fetcher = useRef(
        async (config: apiConfig<R, P>) =>
            new Promise<R>((resolve, reject) => {
                fetch<R, P>(config)
                    .then((res: response<R, P>) => {
                        success(config, res)
                        resolve(res?.data)
                    })
                    .catch((err: error<R, P>) => {
                        error(config, err)
                        reject(err.message)
                    })
            })
    )

    return fetcher.current
}

export const useGet = <R>(): ((c: apiConfig<R>) => Promise<R | void>) => {
    const get = useApi<R>()

    const fetcher = useRef(async (c: apiConfig<R>) =>
        get({ ...c, method: c.method || "GET" }).catch(console.log)
    )

    return fetcher.current
}

export const useDelete = <R = undefined>(): ((
    c: apiConfig<R>
) => Promise<R | void>) => {
    const del = useApi<R>()

    const fetcher = useRef(async (c: apiConfig<R>) =>
        del({ ...c, method: c.method || "DELETE" }).catch(console.log)
    )

    return fetcher.current
}

export const useAdd = <P, R = undefined>(): ((
    c: apiConfig<R, P>
) => Promise<R | void>) => {
    const put = useApi<R, P>()

    const fetcher = useRef(async (c: apiConfig<R, P>) =>
        put({ ...c, method: c.method || "PUT" }).catch(console.log)
    )

    return fetcher.current
}

export const useUpdate = <P, R = undefined>(): ((
    c: apiConfig<R, P>
) => Promise<R | void>) => {
    const post = useApi<R, P>()

    const fetcher = useRef(async (c: apiConfig<R, P>) =>
        post({ ...c, method: c.method || "POST" }).catch(console.log)
    )

    return fetcher.current
}

export const useBlob = <P = undefined>(): ((
    c: apiConfig<File, P>
) => Promise<File | void>) => {
    const post = useApi<File, P>()

    const fetcher = useRef(async (c: apiConfig<File, P>) =>
        post({ 
            ...c, method: c.method || "POST", 
            responseType: "blob"
        }).catch(
            console.log
        )
    )

    return fetcher.current
}

export const useBytes = <P = undefined>(): ((
    c: apiConfig<ArrayBuffer, P>
) => Promise<ArrayBuffer | void>) => {
    const post = useApi<ArrayBuffer, P>()

    const fetcher = useRef(async (c: apiConfig<ArrayBuffer, P>) =>
        post({ 
            ...c, method: c.method || "POST", 
            responseType: "arraybuffer"
        }).catch(
            console.log
        )
    )

    return fetcher.current
}

export const useFetcher = <R, P = undefined>(config: fetchConfig<P>) => {
    const cref = useRef(config)

    const [data, setData] = useState<R>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const refresh = () => {
        if (!cref.current.urlPath) return

        setLoading(true)
        fetch<R, P>(cref.current)
            .then((res) => {
                setData(res?.data)
                setError(false)
            })
            .catch((err) => {
                setError(true)
                console.log(err.message)
            })
            .finally(() => setLoading(false))
    }

    useEffect(refresh, [])

    return {
        data,
        loading,
        error,
        refresh
    }
}
