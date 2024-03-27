import { useEffect, useState, useCallback } from "react";

import { Rules } from "./Rules";
import { inputChanged } from "../events/Events";
import { useCatchEvent } from "../events/CustomEvents";

type ruleKey = keyof typeof Rules;

export type validation<T> = {
    name: string;
    required: boolean;
    requiredMsg?: string;
    rules?: ruleKey[];
    custom?: (value: T) => string;
};

export const useValidator = <T = string>(deal: validation<T>) => {
    const [value, setValue] = useState<T>();
    const [valid, setValid] = useState(true);
    const [error, setError] = useState("");

    const event = inputChanged(deal.name);

    const validate = useCallback(() => {
        let message = "";

        const update = () => {
            setError(message);
            setValid(!message);
        };

        if (deal.required && !value) {
            message = deal.requiredMsg || Rules.REQ("");
            update();
            return;
        }

        if (deal.rules) {
            const keys = [...deal.rules];

            const rules = keys.reduce(
                (r, key) => {
                    r[key] = Rules[key];
                    return r;
                },
                {} as Record<string, (v: string) => string>
            );

            for (const rule of Object.values(rules)) {
                message = rule(value as string);
                update();
                if (message) break;
            }
        } else if (deal.custom) {
            message = deal.custom(value as T);
            update();
        }
    }, [deal, value]);

    useCatchEvent(event, setValue);
    useEffect(validate, [validate]);

    return { setValue, valid, error };
};
