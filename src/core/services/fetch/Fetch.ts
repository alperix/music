import { useEffect, useRef, useState } from "react"

import axios, {
    AxiosRequestConfig,
    ResponseType,
    RawAxiosRequestHeaders,
    AxiosResponse,
    AxiosError
} from "axios"

import { api, timeout } from "../Configuration"

export type response<R, P> = AxiosResponse<R, P>
export type error<R, P> = AxiosError<R, P>
export type responseType = ResponseType
export type headers = RawAxiosRequestHeaders

export type query = Record<
    string,
    string | string[] | number | boolean | null | undefined
>
export type methods = "GET" | "PUT" | "DELETE" | "POST"

export type fetchConfig<P = undefined> = {
    urlPath: string
    method?: methods
    query?: query
    payload?: P
    timeout?: number
}

export type requestConfig<P = undefined> = {
    headers?: headers
    responseType?: responseType
} & fetchConfig<P>

export const contentTypeHeader = <P>(payload: P) => {
    let value = "application/json; charset=utf-8"

    if (typeof payload === "string" || payload instanceof String)
        value = "text/plain; charset=utf-8"

    if (payload instanceof FormData) {
        const files = [...payload.values()].some((v) => v instanceof File)
        value = files
            ? "multipart/form-data"
            : "application/x-www-form-urlencoded"
    }

    return { "content-type": value }
}

export const request = <P>(config: requestConfig<P>): AxiosRequestConfig<P> => {
    const url = `${api}/${config.urlPath}${urlParams(config.query)}`

    const req: AxiosRequestConfig<P> = {
        url: url,
        method: config.method ?? "GET",
        data: config.payload,
        headers: { ...contentTypeHeader(config.payload), ...config.headers },
        responseType: config.responseType ?? "json",
        timeout: (config.timeout ?? timeout) * 1000
    }

    return req
}

export const urlParams = (query: query | null | undefined) => {
    if (!query || !Object.keys(query).length) return ""

    const args = Object.keys(query).reduce((args, key) => {
        const v = query[key]
        if (!v) return args
        const value = Array.isArray(v) ? v.join(",") : v
        args.push(`${key}=${value}`)
        return args
    }, [] as string[])

    return `?${args.join("&")}`
}

export const fetch = <R = undefined, P = undefined>(
    config: requestConfig<P>
): Promise<response<R, P>> => axios<R, response<R, P>, P>(request(config))

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
