import React, { PropsWithChildren } from "react";

type IconTypes = "outlined" | "round" | "sharp" | "two-tone";

type IconProps = PropsWithChildren & {
    icon?: string;
    alt?: string;
    typ?: IconTypes;
    block?: boolean;

    error?: boolean;
    success?: boolean;

    bold?: boolean;
    italic?: boolean;
    muted?: boolean;
    size?: number;
    
    clsn?: string;
};

export const Icon: React.FC<IconProps> = ({
    icon,
    alt = "",
    typ = "",
    block,
    clsn,
    size,
    bold,
    italic,
    muted,
    error,
    success,
    children
}) => {
    const css = `material-icons${typ ? `-${typ}` : ""} ${clsn ? clsn : ""}`;

    const style = {
        fontStyle: italic ? "italic" : "inherit",
        fontWeight: bold ? "bold" : "normal",
        fontSize: size ? `${size}rem` : "inherit",
        color: error ? "#b91c1c" : success ? "#15803d" : "inherit",
        opacity: muted ? 0.4 : "inherit",
    };

    const mi = (
        <span className={css} style={style} title={alt}>
            {icon ?? children}
        </span>
    );

    return block ? <div>{mi}</div> : mi;
};
