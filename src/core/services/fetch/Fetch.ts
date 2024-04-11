/**
 * Axios Adapter for fetching
 * the code that follows is related to creating an adapter for fetching data using the Axios library. 
 * This section likely contains functions, types, and configurations specific to 
 * making HTTP requests and handling responses using Axios within a TypeScript environment. 
*/

/** 
 * importing specific types from the Axios library 
 * are used to ensure type safety and alignment with Axios 
 * when making HTTP requests and handling responses. 
 */
import axios, {
    AxiosRequestConfig,
    ResponseType,
    RawAxiosRequestHeaders,
    AxiosResponse,
    AxiosError
    //Method
} from "axios"

/**  
 * importing dependencies related to configuration settings. 
 * likely used within the Axios adapter for setting up base URLs, timeouts, 
 * or other settings necessary for making HTTP requests. 
*/
import { api, timeout } from "../Configuration"

/**
 * Intern abstract type declarations for the fetching process.
 * These types are now mapped to Axios types.
 * This means that the custom types defined in the code are synchronized
 * with the types used by Axios for fetching data.
 * If the Axios module is replaced with another fetching library,
 * only the necessary new mappings need to be added or updated here.
 */
export type response<R, P> = AxiosResponse<R, P>
export type error<R, P> = AxiosError<R, P>
export type responseType = ResponseType
export type headers = RawAxiosRequestHeaders

/**
 * defines a subset of HTTP methods that are implemented and used within the codebase.
 * Subset of the Axios type @param {Method} currently.
 */
export type methods = "GET" | "PUT" | "DELETE" | "POST"

/**
 * This type is used to represent query parameters
 * that can be included in an HTTP request URL.
 */
export type query = Record<
    string,
    string | string[] | number | boolean | null | undefined
>

/**
 * defines configuration options for making HTTP requests.
 * Included only mostly required parameters for fetching
 * @property {string} urlPath - specifies the endpoint or resource on the server.
 * @property {methods} method - specifies the HTTP method to be used for the request.
 * @property {query} query - contains key-value pairs for query parameters that will be included in the request URL.
 * @property {P} payload - will be sent in the request body. It is a generic type `P` that allows you to specify the type of data that will be included in the payload.
 * @property {number} timeout - the maximum time in seconds that the request is allowed to take before being canceled.
 * @property {headers} headers - string key-value pairs that can custom information needed for the communication between the client and server.
 */
export type fetchConfig<P = undefined> = {
    urlPath: string
    method?: methods
    query?: query
    payload?: P

    timeout?: number
    headers?: headers
}

/** includes additional properties specific to the fetching needs 
 * of the application beyond what is provided by Axios. 
 */
export type requestConfig<P = undefined> = {
    responseType?: responseType
} & fetchConfig<P>

/**
 * The function `contentTypeHeader` determines the content type header 
 * based on the type of payload provided.
 * @param {P} payload  
 * @returns { "content-type": "value" }
 */
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

/**
 * Generates an Axios specific request configuration object based on the Request Configuration
 * @param {requestConfig<P>} config - Request Config
 * @returns {AxiosRequestConfig<P>} Axios request configuration object
 */
export const request = <P>(config: requestConfig<P>): AxiosRequestConfig<P> => {
    const url = `${api}/${config.urlPath}${urlParams(config.query)}`

    const req: AxiosRequestConfig<P> = {
        url: config.urlPath && url,
        method: config.method ?? "GET",
        data: config.payload,
        headers: { ...contentTypeHeader(config.payload), ...config.headers },
        responseType: config.responseType ?? "json",
        timeout: (config.timeout ?? timeout) * 1000
    }

    return req
}

/**
 * takes a query object and returns a URL query string based on its key-value pairs.
 * @param {query} query - an object containing key-value pairs 
 * @returns URL query string 
 */
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

/**
 * This function uses axios to make a request based on the provided configuration 
 * and returns a Promise with the response. It serves as an adapter for making HTTP requests using Axios. 
 * Generic types @param {<R, P>} represent the response data type and the request payload type, respectively.
 */
export const fetch = <R = undefined, P = undefined>(
    config: requestConfig<P>
): Promise<response<R, P>> => axios<R, response<R, P>, P>(request(config))
