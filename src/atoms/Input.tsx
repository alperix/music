import React from "react";

import { Label } from "./Label";

export type InputProps = {
    name: string;
    label: string;
    labelSR?: string;
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
    required?: boolean;
    disabled?: boolean;
};

export const Input = ({
    name,
    label,
    labelSR,
    value,
    onChange,
    required,
    disabled,
    ...restProps
}: InputProps) => {
    return (
        <div className={"form-group "}>
            <Label
                htmlFor={name}
                text={label}
                textSR={labelSR}
                required={required ?? false}
                disabled={disabled ?? false}
            />
            <div className="flex self-baseline">
                <div className="flex-1">
                    <input
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
