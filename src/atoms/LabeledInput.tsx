import React from "react";

import { Label } from "./Label";

import { InputElementProps } from "./Types";

export type Props = InputElementProps & { label?: string };

export const Input = ({
    name = "input",
    value,
    required,
    disabled,
    onChange,
    label,
    ...restProps
}: Props) => {
    return (
        <div className={"form-group "}>
            {label && (
                <Label
                    htmlFor={name}
                    text={label}
                    required={required}
                    disabled={disabled}
                />
            )}
            <div className="flex self-baseline">
                <div className="flex-1">
                    <Input
                        {...restProps}
                        name={name}
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                        required={required}
                    />
                </div>
            </div>
        </div>
    );
};
