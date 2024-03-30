import React, { InputHTMLAttributes } from "react";

import { Label } from "./Label";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
};

export const Input = ({
    name,
    value,
    required,
    disabled,
    onChange,
    label,
    ...restProps
}: InputProps) => {
    return (
        <div className={"form-group "}>
            <Label
                htmlFor={name}
                text={label}
                required={required}
                disabled={disabled}
            />
            <div className="flex self-baseline">
                <div className="flex-1">
                    <input
                        id={name}
                        name={name}
                        value={value}
                        type={"text"}
                        onChange={onChange}
                        disabled={disabled}
                        required={required}
                        {...restProps}
                    />
                </div>
            </div>
        </div>
    );
};
