import { useEffect, useState, useCallback } from "react";

import { Rules } from "../domain/Rules";

type ruleKey = keyof typeof Rules;

export type validation = {
    required: boolean;
    requiredMsg?: string;
    rules?: string;
    custom?: (value: string) => string;
};

export const useValidator = (deal: validation) => {
    const [value, setValue] = useState("");
    const [valid, setValid] = useState(true);
    const [error, setError] = useState("");

    const validate = useCallback(() => {
        const rulesKeys = Object.keys(Rules);

        const keys = (deal.rules
            ?.toUpperCase()
            .split(",")
            .map((r) => r.trim())
            .filter((k) => rulesKeys.includes(k)) || []) as ruleKey[];

        if (deal.required) keys.unshift("REQ");

        const rules = keys.reduce(
            (r, key) => {
                r[key] = Rules[key];
                return r;
            },
            {} as Record<string, (v: string) => string>
        );

        if (deal.custom) rules.custom = deal.custom;

        for (const rule of Object.values(rules)) {
            const msg = rule(value); 
            setError(msg);
            setValid(!msg);
            if (msg) break;
        }
    }, [deal, value]);

    useEffect(validate, [validate]);

    return { setValue, valid, error };
};
