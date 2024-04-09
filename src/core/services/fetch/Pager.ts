import { useCallback, useEffect, useRef, useState } from "react";

import { fetch, fetchConfig, query } from "./Fetch";
import { pageSize } from "../Configuration";

export type order = "asc" | "desc";

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

export const usePager = <R>(url: string, config?: PagerArgs) => {
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
        };
    });

    const [query, setQuery] = useState<PagerArgs>({
        page: config?.page ?? 0,
        size: config?.size ?? pageSize,
        order: config?.order ?? "desc",
        orderBy: config?.orderBy ?? "createdAt",
        search: config?.search ?? "",
        args: config?.args ?? {}
    });

    const [request, setRequest] = useState<fetchConfig>(
        transform.current(query)
    );

    const [data, setData] = useState<Page<R>>(defaultPage);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const refresh = useCallback(() => {
        setLoading(true);
        fetch<Page<R>>(request)
            .then((res) => {
                setData(res?.data);
                setError(false);
            })
            .catch((err) => {
                setError(true);
                console.log(err.message);
            })
            .finally(() => setLoading(false));
    }, [request]);

    const setters = {
        page: (page: number) => setQuery({ ...query, page }),
        size: (size: number) => setQuery({ ...query, size, page: 0 }),
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

    useEffect(() => setRequest(transform.current(query)), [query]);
    useEffect(refresh, [refresh]);

    return {
        data,
        query,
        setters,
        loading,
        error,
        refresh
    };
};
