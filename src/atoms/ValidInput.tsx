import React from "react";

import { InputElementProps } from "./Types";

import {
    ValidationInput,
    useValidator,
    validationStatus
} from "@/core/services/validation/Validation";

import { interval } from "@/core/services/validation/Rules";

import { Input } from "./Input";
import { ErrorDiv } from "./Error";

export type ValidInputProps = InputElementProps & ValidationInput;

type inputLimits = {
    minLength?: number | undefined;
    maxLength?: number | undefined;
    min: string | number | undefined;
    max: string | number | undefined;
};

const Interval = (limits: inputLimits, value: string): interval => {
    const { min, max, minLength, maxLength } = limits;

    const def = {
        number: min || max,
        value: value
    } as interval;

    if (min || minLength) def.min = Number(min) || minLength;
    if (max || maxLength) def.max = Number(max) || maxLength;

    return def;
};

export const ValidInput = ({
    // Input / Validation props
    name = "validated-input",
    value,
    required,
    requiredMsg,
    rules,
    validation,
    onChange,
    onValidate,
    disabled,

    // Limit props
    min,
    max,
    minLength,
    maxLength,

    ...restProps
}: ValidInputProps) => {
    const intValue = Interval({ min, max, minLength, maxLength }, value);

    const onSend = (status: validationStatus) => {
        const other = status.name === name ? limits : validate;
        validation &&
            onValidate &&
            onValidate({
                name,
                error: status.error || other.error || "",
                valid: status.valid && other.valid
            });
    };

    const validate = useValidator(value, {
        name,
        required,
        requiredMsg,
        onValidate: onSend,
        rules
    });

    const limits = useValidator(intValue, {
        name: "interval",
        onValidate: onSend,
        rules: ["INTERVAL"]
    });

    return (
        <div>
            <Input
                {...restProps}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
            />
            {validation && (
                <ErrorDiv>
                    {validate.error && <div>{validate.error}</div>}
                    {limits.error && <div>{limits.error}</div>}
                </ErrorDiv>
            )}
        </div>
    );
};
