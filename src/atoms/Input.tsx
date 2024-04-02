import React from "react";

import { InputElementProps } from "./Types";

export const Input = ({
    name = "input",
    value,
    required,
    disabled,
    onChange,
    ...restProps
}: InputElementProps) => {
    return (
        <input
            {...restProps}
            id={name}
            name={name}
            value={value}
            type={"text"}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            required={required}
        />
    );
};
