export type storage = "local" | "session"

export const useStorage = (typ: storage, prefix: string = "Storage")  => {

    const store : Storage  = typ == "local" ? localStorage :  sessionStorage;
	const storeKey = (key: string) => `${prefix}.${key}`;

	const set = (key: string, value: unknown) => {
		if (value === undefined || value === null) return;
		try {
			store.setItem(storeKey(key), JSON.stringify(value));
		} catch (e) {
			console.log(`Storage error by saving ${key}:`, value);
		}
	};

	const get = (key: string) => {
		try {
			const value = store.getItem(storeKey(key));
			return value === undefined || value === null ? null : JSON.parse(value);
		} catch (e) {
			console.log(`Storage error by getting value of ${key}`);
		}
	};

	const del = (key: string) => store.removeItem(storeKey(key));

	return { set, get, del };
};