import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { useGet, useUpdate } from "./Api"
import { apiConfig } from "./Handlers"

export type SubmitParams<R> = {
    api: string
    home: string
    event?: string
    routeKey?: string
    title?: (data?: R) => string
}

export const useSubmit = <R, P>(config: SubmitParams<R>) => {
    const cref = useRef(config)
    const params = useParams()
    const navigate = useNavigate()

    const get = useGet<R>()
    const post = useUpdate<P, R>()

    const id = params[cref.current.routeKey ?? "id"]
    const add = /^(add|new|put)$/.test(id ?? "")
    const update = !add && !isNaN(Number(id))

    const [data, setData] = useState<R | undefined>()
    const [edit, setEdit] = useState(add || (update && !!data))

    const request = (values: P): apiConfig<R, P> => {
        const c = cref.current

        return {
            urlPath: add ? c.api : `${c.api}/${id}`,
            method: add ? "PUT" : "POST",
            payload: values,
            success: {
                event: c.event,
                navigate: c.home
            }
        }
    }

    useEffect(() => {
        const c = cref.current

        if (update) {
            get({
                urlPath: `${c.api}/${id}`,
                error: { navigate: c.home }
            }).then((r) => {
                setData(r ?? undefined)
                setEdit(!!r)
            })
        }
    }, [id, update, get])

    const home = () => navigate(cref.current.home)
    const cancel = add ? home : () => setEdit(false)
    const submit = (values: P) => post(request(values))

    return {
        data,
        mode: {
            edit,
            add,
            update
        },
        actions: {
            home,
            cancel,
            submit,
            edit: () => setEdit(true)
        }
    }
}
