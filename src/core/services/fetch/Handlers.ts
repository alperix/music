import { useRef } from "react"
import { useSnackbar } from "notistack"
import { useNavigate } from "react-router-dom"

import { emitEvent } from "../events/CustomEvents"
import { requestConfig, error, response } from "./Fetch"
import messages from "./Messages.json"

export type messageKey = keyof typeof messages

export type handler<R = undefined> = {
    event?: string
    navigate?: string
    message?: string
    callback?: (value: R | undefined) => void
}

export type fetchHandlers<R = undefined, P = undefined> = {
    success?: handler<R>
    error?: handler<error<R, P>>
}

export type apiConfig<R = undefined, P = undefined> = requestConfig<P> &
    fetchHandlers<R, P>

export const useMessages = () => {
    const { enqueueSnackbar } = useSnackbar()

    const successSnack = (message: string) => {
        message && enqueueSnackbar(message, { variant: "success" })
    }

    const errorSnack = (message: string) => {
        message && enqueueSnackbar(message, { variant: "error" })
    }

    return { successSnack, errorSnack }
}

export const useRouter = () => {
    const navigate = useNavigate()

    const redirect = (url: string, replace = true) => {
        setTimeout(() => navigate(url, { replace }), 100)
    }

    return redirect
}

export const errorMessage = <R, P>(error: error<R, P>): string => {
    if (error.response) {
        // The request was made and the server responded with a status code hat falls out of the range of 2xx
        console.log("Response: ", error.response)
        const key = error.response.status.toString() as messageKey
        return messages[key] ?? messages.error
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
        console.log("Config: ", error.config)
        console.log("Request", error.request)
        const timeout = error.code === "ECONNABORTED"
        return timeout ? messages.timeout : messages[404]
    } else {
        // Something happened in setting up the request that triggered an Error
        // console.log("Error", error.message)
        return error.message
    }
}

export const useFetchHandlers = <R = undefined, P = undefined>() => {
    const { successSnack, errorSnack } = useMessages()
    const navigate = useRouter()

    const success = useRef((config: apiConfig<R, P>, res: response<R, P>) => {
        const cfs = config.success

        if (!cfs) return

        successSnack(
            cfs.message
                ? cfs.message
                : messages[config.method as messageKey] ?? ""
        )

        cfs.callback && cfs.callback(res.data)
        cfs.event && emitEvent(cfs.event, res.data)
        cfs.navigate && navigate(cfs.navigate)
    })

    const error = useRef((config: apiConfig<R, P>, err: error<R, P>) => {
        const cfe = config.error

        if (!cfe) return

        errorSnack(cfe.message ? cfe.message : errorMessage(err))

        cfe.callback && cfe.callback(err)
        cfe.event && emitEvent(cfe.event, err)
        cfe.navigate && navigate(cfe.navigate)
    })

    return { success: success.current, error: error.current }
}
