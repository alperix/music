import { SECRET } from "./Configuration"

const Crypto = window.crypto.subtle
const Random = window.crypto.getRandomValues

const toString = (bytes: Uint8Array) =>
    Array.from(bytes, (byte) => ("0" + byte.toString(16)).slice(-2)).join("")

const toBytes = (data: string) =>
    new Uint8Array(data.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)))

export const KEY = async (
    salt: Uint8Array,
    keySize: number,
    iterations: number = 100
): Promise<CryptoKey> => {
    const importedKey = await Crypto.importKey(
        "raw",
        new TextEncoder().encode(SECRET),
        "PBKDF2",
        false,
        ["deriveKey"]
    )

    const derivedKey = await Crypto.deriveKey(
        {
            name: "PBKDF2",
            hash: "SHA-256",
            salt: salt,
            iterations: iterations
        },
        importedKey,
        {
            name: "AES-CBC",
            length: keySize
        },
        false,
        ["encrypt", "decrypt"]
    )

    return derivedKey
}

export const encrypt = async <T>(data: T): Promise<string | null> => {
    if (!data) return null

    const keySize = 256

    const salt = new Uint8Array(keySize / 8)
    Random(salt)

    const iv = new Uint8Array(keySize / 8)
    Random(iv)

    const encodedData = new TextEncoder().encode(JSON.stringify(data))

    const cipher = await Crypto.encrypt(
        {
            name: "AES-CBC",
            iv: iv
        },
        await KEY(salt, keySize),
        encodedData
    )

    const encrypted = new Uint8Array(cipher)

    return `${toString(salt)}${toString(iv)}${toString(encrypted)}`
}

export const decrypt = async (data: string): Promise<unknown | null> => {
    if (!data) return null

    const keySize = 256

    const salt = toBytes(data.slice(0, keySize / 8))
    const iv = toBytes(data.slice(keySize / 8, 2 * (keySize / 8)))
    const encrypted = toBytes(data.slice(keySize / 4))

    const decrypted = await Crypto.decrypt(
        {
            name: "AES-CBC",
            iv: iv
        },
        await KEY(salt, keySize),
        encrypted
    )

    const content = new TextDecoder().decode(decrypted)

    try {
        return JSON.parse(content)
    } catch (error) {
        console.error("Error parsing decrypted data as JSON:", error)
        return null
    }
}
