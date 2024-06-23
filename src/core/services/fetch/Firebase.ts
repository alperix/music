import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

import {
    getFirestore,
    CollectionReference,
    DocumentData
} from "firebase/firestore"

import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore"

import { fireBaseConfig } from "../Configuration"

// Initialize Firebase
export const FB = initializeApp(fireBaseConfig)
export const FBAX = getAnalytics(FB)
export const DB = getFirestore(FB)

export class FirebaseService<T extends DocumentData> {
    private collection: CollectionReference<T>

    constructor(path: string) {
        this.collection = collection(DB, path) as CollectionReference<T>
    }

    async getAll(): Promise<T[]> {
        const shot = await getDocs(this.collection)
        return shot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    }

    async get(id: string): Promise<T | null> {
        const item = await getDoc(doc(this.collection, id))

        if (item.exists()) {
            return { ...item.data(), id: item.id } as T
        } else {
            return null
        }
    }

    async add(data: T): Promise<string> {
        const ref = await addDoc(this.collection, data)
        return ref.id
    }

    async update(id: string, data: T): Promise<void> {
        const ref = doc(this.collection, id)
        await updateDoc(ref, data)
    }

    async delete(id: string): Promise<void> {
        const ref = doc(this.collection, id)
        await deleteDoc(ref)
    }
}
