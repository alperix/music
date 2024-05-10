import Cookies, { CookieOptions } from "browser-cookies"

import { isDev } from "./Configuration"

export type expired = number | string | Date

const options = (expired?: expired): CookieOptions => ({
    samesite: "Strict",
    secure: !isDev,
    domain: "", // current domain
    path: "/",  // the cookie to be readable from all paths
    httponly: false, // By browser cookies always false,
    expires: expired ? expired : 0 // 365 - 1 year
})

export const useCookies = (prefix: string = "Cookies") => {
    const cookieKey = (key: string) => `${prefix}.${key}`

    const set = (key: string, value: unknown, expired?: expired) => {
        if (value === undefined || value === null) return
        try {
            Cookies.set(
                cookieKey(key),
                JSON.stringify(value),
                options(expired)
            )
        } catch (e) {
            console.log(`Cookie error by saving ${key}:`, value)
        }
    }

    const get = (key: string) => {
        try {
            const value = Cookies.get(cookieKey(key))
            return value === undefined || value === null
                ? null
                : JSON.parse(value)
        } catch (e) {
            console.log(`Cookie error by getting value of ${key}`)
        }
    }

    const del = (key: string) => Cookies.erase(cookieKey(key))

    return { set, get, del }
}
