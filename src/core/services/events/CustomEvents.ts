import { EffectCallback, useEffect, useRef } from "react";

export type eventHandler<T> = (detail: T) => void;

export type eventEffect = <T>(
    name: string,
    handler: eventHandler<T>
) => () => void;

export const eventListener: eventEffect =
    <T>(name: string, handler: (detail: T) => void) =>
    () => {
        const then = ((e: CustomEvent<T>) =>
            handler(e.detail)) as EventListener;

        window.addEventListener(name, then);
        console.log(`ADD Listener: ${name}`);

        return () => {
            console.log(`REMOVE Listener: ${name}`);
            window.removeEventListener(name, then);
        };
    };

export const emitEvent = <T>(name: string, data: T): void => {
    const event = new CustomEvent(name, { bubbles: false, detail: data });
    window.dispatchEvent(event);
    console.log("event:", event);
};

export const useCatchEvent = <T>(
    name: string,
    handler: (detail: T) => void
) => {
    const listener = useRef<EffectCallback>(eventListener(name, handler));
    useEffect(() => listener.current(), []);
};
