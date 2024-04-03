import React, { LabelHTMLAttributes, PropsWithChildren } from "react";

export type ContentProps = {
    text: string;
    textSR?: string;
    required?: boolean;
    disabled?: boolean;
};

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & ContentProps;
export type ContainerProps = LabelProps &
    PropsWithChildren & { horizontal?: boolean; full?: boolean };

export const LabelContent = ({
    text,
    textSR,
    required,
    disabled
}: ContentProps) => {
    text = text.endsWith("*") ? text.slice(0, text.length - 1) : text;

    return (
        <span
            style={{
                opacity: disabled ? "0.5" : "1.0"
            }}
        >
            <span className="sr-only">{textSR || text}</span>
            <span className="inline sm:hidden" aria-hidden="true">
                {text}
            </span>
            <span className="hidden sm:inline" aria-hidden="true">
                {text}
            </span>
            {required ? <sup aria-hidden="true">*</sup> : ""}
        </span>
    );
};

export const Label = ({
    text,
    textSR,
    required,
    disabled,
    ...restProps
}: LabelProps) => {
    return (
        <label {...restProps}>
            <LabelContent
                text={text}
                textSR={textSR}
                required={required}
                disabled={disabled}
            />
        </label>
    );
};

export const LabelContainer = ({
    children,
    full,
    horizontal,
    ...restProps
}: ContainerProps) => {
    const contClass = `flex ${horizontal ? "flex-row" : "flex-col"} items-baseline`;
    const inputClass = `${full ? "w-full" : ""} ${horizontal ? "ml-4" : "mt-2"}`;

    return (
        <div className={contClass}>
            <Label {...restProps} />
            <div className={inputClass}>{children}</div>
        </div>
    );
};
