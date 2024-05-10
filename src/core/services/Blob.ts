import mimeLookup from "mime"
import { saveAs } from "file-saver"

export type AllowedFileTypes = ArrayBuffer | Blob | File | string
export type FileType = "bytes" | "blob" | "file" | "dataurl" | "base64" | "invalid"

export const RxBase64 =
    /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/

export const RxDataUrl = /^data:[\w/+-]+;base64,[\w+/]*={0,2}$/

export const TypeOfFile = <F extends AllowedFileTypes>(
    content: F
): FileType => {
    if (content instanceof ArrayBuffer) return "bytes"
    if (content instanceof Blob) return "blob"
    if (content instanceof File) return "file"

    if (typeof content === "string" || content instanceof String) {
        if (RxDataUrl.test(content as string)) return "dataurl"
        if (RxBase64.test(content as string)) return "base64"
    }

    return "invalid"
}

export const MIME = (path: string) => mimeLookup.getType(path)
export const EXTENSIONS = (mime: string) => mimeLookup.getAllExtensions(mime)

export const URLMIME = (url: string) =>
    url.match(/^data:(.+);base64,/)?.[1] ?? ""

export const B64fromURL = (url: string) => url.replace(/^data:.+;base64,/, "")

export const DATAURL = (mime: string, base64: string) =>
    `data:${mime};base64,${base64}`

export const B64toBYTES = (base64: string) => {
    const binary = window.atob(base64)
    const length = binary.length
    const bytes = new Uint8Array(length)

    for (let i = 0; i < length; i++) {
        bytes[i] = binary.charCodeAt(i)
    }

    return bytes.buffer
}

export const BYTEStoB64 = (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer)
    let binary = ""

    bytes.forEach((byte) => (binary += String.fromCharCode(byte)))

    return window.btoa(binary)
}

export const ReadBYTES = <T extends File | Blob>(file: T) => {
    return new Promise<ArrayBuffer>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e?.target?.result as ArrayBuffer)
        reader.readAsArrayBuffer(file)
    })
}

export const ReadURL = <T extends File | Blob>(file: T) => {
    return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e?.target?.result as string)
        reader.readAsDataURL(file)
    })
}

export const Download = <T extends AllowedFileTypes>(
    file: T,
    name?: string,
    mime?: string
) => {
    const type = TypeOfFile(file)

    if (type === "invalid") throw new Error("Invalid file type")

    switch (type) {
        case "file":
            saveAs(file as File, name)
            break

        case "blob":
        case "dataurl": {
            ToFile(file, name)
                .then((f) => saveAs(f))
                .catch(console.error)
            break
        }

        case "base64":
        case "bytes": {
            ToFile(file, name, mime)
                .then((f) => saveAs(f))
                .catch(console.error)
            break
        }
    }
}

export const ToFile = <T extends AllowedFileTypes>(
    file: T,
    name?: string,
    mime?: string
) => {
    const type = TypeOfFile(file)

    if (type === "invalid") throw new Error("Invalid file type")

    return new Promise<File>((resolve, reject) => {
        switch (type) {
            case "file":
                resolve(file as File)
                break

            case "blob": {
                if (!name) reject("File Name is required")
                else {
                    const blob = file as Blob
                    resolve(new File([blob], name))
                }
                break
            }

            case "bytes": {
                if (!name || !mime)
                    reject("File Name and mime type is required")
                else {
                    const bytes = file as ArrayBuffer
                    const type = mimeLookup.getType(name) ?? mime
                    const blob = new Blob([bytes], { type })
                    resolve(new File([blob], name))
                }
                break
            }

            case "dataurl": {
                if (!name) throw new Error("File Name is required")

                const str = file as string
                const bytes = B64toBYTES(B64fromURL(str))
                const blob = new Blob([bytes], { type: URLMIME(str) })
                resolve(new File([blob], name))
                break
            }

            case "base64": {
                if (!name || !mime)
                    reject("File Name and mime type is required")
                else {
                    const str = file as string
                    const bytes = B64toBYTES(str)
                    const type = MIME(name) ?? mime
                    const blob = new Blob([bytes], { type })
                    resolve(new File([blob], name))
                }
                break
            }
        }
    })
}

export const ToBlob = <T extends AllowedFileTypes>(file: T, mime?: string) => {
    const type = TypeOfFile(file)

    if (type === "invalid") throw new Error("Invalid file type")

    return new Promise<Blob>((resolve, reject) => {
        switch (type) {
            case "file": {
                const f = file as File
                resolve(new Blob([f], { type: f.type }))
                break
            }

            case "blob": {
                resolve(file as Blob)
                break
            }

            case "bytes": {
                if (!mime) reject("File mime type is required")
                else {
                    const bytes = file as ArrayBuffer
                    resolve(new Blob([bytes], { type: mime }))
                }
                break
            }

            case "dataurl": {
                const str = file as string
                const bytes = B64toBYTES(B64fromURL(str))
                resolve(new Blob([bytes], { type: URLMIME(str) }))
                break
            }

            case "base64": {
                if (!mime) reject("File mime type is required")
                else {
                    const str = file as string
                    const bytes = B64toBYTES(str)
                    resolve(new Blob([bytes], { type: mime }))
                }
                break
            }
        }
    })
}

export const ToBytes = <T extends AllowedFileTypes>(file: T) => {
    const type = TypeOfFile(file)

    if (type === "invalid") throw new Error("Invalid file type")

    return new Promise<ArrayBuffer>((resolve) => {
        switch (type) {
            case "file": {
                ReadBYTES(file as File).then((bytes) => resolve(bytes))
                break
            }

            case "blob": {
                ReadBYTES(file as Blob).then((bytes) => resolve(bytes))
                break
            }

            case "bytes": {
                resolve(file as ArrayBuffer)
                break
            }

            case "dataurl": {
                resolve(B64toBYTES(B64fromURL(file as string)))
                break
            }

            case "base64": {
                resolve(B64toBYTES(file as string))
                break
            }
        }
    })
}

export const ToDataUrl = <T extends AllowedFileTypes>(
    file: T,
    mime?: string
) => {
    const type = TypeOfFile(file)

    if (type === "invalid") throw new Error("Invalid file type")

    return new Promise<string>((resolve, reject) => {
        switch (type) {
            case "file": {
                ReadURL(file as File).then((url) => resolve(url))
                break
            }

            case "blob": {
                ReadURL(file as Blob).then((url) => resolve(url))
                break
            }

            case "bytes": {
                if (!mime) reject("File mime type is required")
                else resolve(DATAURL(mime, BYTEStoB64(file as ArrayBuffer)))
                break
            }

            case "dataurl": {
                resolve(file as string)
                break
            }

            case "base64": {
                if (!mime) reject("File mime type is required")
                else resolve(DATAURL(mime, file as string))
                break
            }
        }
    })
}

export const ToBase64 = <T extends AllowedFileTypes>(file: T) => {
    const type = TypeOfFile(file)

    if (type === "invalid") throw new Error("Invalid file type")

    return new Promise<string>((resolve) => {
        switch (type) {
            case "file": {
                ReadURL(file as File).then((url) => resolve(B64fromURL(url)))
                break
            }

            case "blob": {
                ReadURL(file as Blob).then((url) => resolve(B64fromURL(url)))
                break
            }

            case "bytes": {
                resolve(BYTEStoB64(file as ArrayBuffer))
                break
            }

            case "dataurl": {
                resolve(B64fromURL(file as string))
                break
            }

            case "base64": {
                resolve(file as string)
                break
            }
        }
    })
}

export class FileService<T extends AllowedFileTypes> {
    file: T
    type: FileType

    constructor(file: T) {
        this.file = file
        this.type = TypeOfFile(file)

        if (this.type === "invalid") throw new Error("Invalid file type")
    }
}
