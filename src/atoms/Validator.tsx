import React, { ReactNode } from "react";
import { Validation, useValidator } from "@/core/services/validation/Validation";
import { ErrorDiv } from "./Error";

type validator<T> = Validation & { value: T };

export const Validator : <T>(props: validator<T>) => ReactNode = ({
    name,
    required,
    requiredMsg,
    onValidate,
    rules,
    validation,
    value
}) => {

    const validate = useValidator(value, {
        name,
        required,
        requiredMsg,
        onValidate,
        rules
    });

    return validation && (
        <ErrorDiv>
            {validate.error && <div>{validate.error}</div>}
        </ErrorDiv>
    );
};
