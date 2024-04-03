import { useEffect, useState, useCallback } from "react";
import { Rules, rule, ruleKey } from "./Rules";

// import { inputChanged } from "../events/Events";
// import { useCatchEvent } from "../events/CustomEvents";

export type validationStatus = {
    name: string;
    error: string;
    valid: boolean;
};

export type Validation = {
    name: string;
    required?: boolean;
    requiredMsg?: string;
    onValidate?: (v: validationStatus) => void;
    rules?: ruleKey[];
    validation?: boolean;
    // event?: boolean;
}

export const useValidator = <T>(value : T, deal: Validation) => {
    const [valid, setValid] = useState(true);
    const [error, setError] = useState("");

    const validate = useCallback(() => {
        let message = "";

        if (deal.required && !value) {
            message = deal.requiredMsg || Rules.REQ("");
        }

        if (!message && deal.rules) {
            const keys = [...deal.rules];

            const rules = keys.reduce(
                (r, key: ruleKey) => {
                    r[key] = Rules[key] as rule<T>;
                    return r;
                },
                {} as Record<string, rule<T>>
            );

            for (const rule of Object.values(rules)) {
                message = rule(value as T);
                if (message) break;
            }
        }

        const send = deal.onValidate;

        setError(message);
        setValid(!message);
        send && send({ name: deal.name, error: message, valid: !message });
    }, [deal, value]);

    //useCatchEvent(inputChanged(deal.name), deal.event ? setValue : () => {});
    useEffect(validate, [validate]);

    return { valid, error };
};
