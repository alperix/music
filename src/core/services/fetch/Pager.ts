import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { fetch, fetchConfig, query } from "./Fetch"
import { pageSize } from "../Configuration"

export type order = "asc" | "desc"
export type Dto = { id: number | string }

export type Page<R extends Dto> = {
    content: R[]
    totalPages: number
    totalElements: number
    size: number
    number: number
    numberOfElements: number
    first: boolean
    last: boolean
    empty: boolean
}

export type PagerArgs = {
    page?: number
    size?: number
    order?: order
    orderBy?: string
    search?: string
    args?: query
    disabled?: boolean
}

export type PageSetter = {
    page: (page: number) => void
    size: (size: number) => void
    search: (search: string) => void
    args: (args: query) => void
    sort: (orderBy: string, order?: order) => void
}

export type Pager<T extends Dto> = {
    data: Page<T>
    query: PagerArgs
    setters: PageSetter
    loading: boolean
    error: boolean
    refresh: () => void
}

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

export const usePager = <R extends Dto>(url: string, config?: PagerArgs) => {
    const transform = useRef((q: PagerArgs): fetchConfig => {
        return {
            urlPath: url,
            method: "GET",
            query: {
                page: q.page,
                size: q.size,
                sort: [q.orderBy ?? "createdAt", q.order ?? "desc"],
                search: q.search,
                ...q.args
            }
        }
    })

    const [query, setQuery] = useState<PagerArgs>({
        page: config?.page ?? 0,
        size: config?.size ?? pageSize,
        order: config?.order ?? "desc",
        orderBy: config?.orderBy ?? "createdAt",
        search: config?.search ?? "",
        args: config?.args ?? {}
    })

    const [data, setData] = useState<Page<R>>(defaultPage)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const refresh = useCallback(() => {
        const request = transform.current(query)
        setLoading(true)
        fetch<Page<R>>(request)
            .then((res) => {
                setData(res?.data)
                setError(false)
            })
            .catch((err) => {
                setError(true)
                console.log(err.message)
            })
            .finally(() => setLoading(false))
    }, [query])

    const setters: PageSetter = useMemo(
        () => ({
            page: (page: number) => setQuery((q) => ({ ...q, page })),
            size: (size: number) => setQuery((q) => ({ ...q, page: 0, size })),
            search: (search: string) => setQuery((q) => ({ ...q, search })),
            args: (args: query) => setQuery((q) => ({ ...q, args })),

            sort: (orderBy: string, order?: order) =>
                setQuery((q) => {
                    let orb = q.orderBy
                    let ord = q.order

                    if (orb === orderBy) {
                        ord = order ? order : ord === "asc" ? "desc" : "asc"
                    } else {
                        orb = orderBy
                        ord = order ? order : "desc"
                    }

                    return { ...q, order: ord, orderBy: orb }
                })
        }),
        []
    )

    useEffect(refresh, [refresh])

    return {
        data,
        query,
        loading,
        error,
        refresh,
        setters
    }
}
