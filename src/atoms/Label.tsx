import React, { LabelHTMLAttributes } from "react";

export type ContentProps = {
    text: string;
    textSR?: string;
    wrap?: boolean;
    required?: boolean;
    disabled?: boolean;
};

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & ContentProps;

export const LabelContent = ({
    text,
    textSR,
    wrap,
    required,
    disabled
}: ContentProps) => {
    text = text.endsWith("*") ? text.slice(0, text.length - 1) : text;

    return (
        <span
            style={{
                whiteSpace: wrap ? "inherit" : "nowrap",
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
    textSR = "",
    wrap = false,
    required = false,
    disabled = false,
    ...restProps
}: LabelProps) => {
    return (
        <label {...restProps}>
            <LabelContent
                text={text}
                textSR={textSR}
                wrap={wrap}
                required={required}
                disabled={disabled}
            />
        </label>
    );
};
