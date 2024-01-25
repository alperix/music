import { useCallback, useEffect } from "react";

export const Trigger = <T>(name: string, data: T): void => {
    window.dispatchEvent(
        new CustomEvent(name, { bubbles: false, detail: data })
    );
};

export const useEvent = <T>(name: string, handler: (detail: T) => void) => {
    const effect = useCallback(() => {
        const then = ((e: CustomEvent<T>) =>
            handler(e.detail)) as EventListener;

        window.addEventListener(name, then);
        //console.log(`ADD Listener: ${name}`);

        return () => {
            //console.log(`REMOVE Listener: ${name}`);
            window.removeEventListener(name, then);
        };
    }, [handler, name]);

    useEffect(effect, [effect]);
};
