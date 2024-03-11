import React, { PropsWithChildren } from "react";

type IconTypes = "outlined" | "round" | "sharp" | "two-tone";

type IconProps = PropsWithChildren & {
    icon?: string;
    alt?: string;
    typ?: IconTypes;
    size?: number;
    cls?: string;

    block?: boolean;
    error?: boolean;
    success?: boolean;
    bold?: boolean;
    muted?: boolean;
};

export const Icon: React.FC<IconProps> = ({
    icon,
    alt = "",
    typ = "",
    block,
    cls,
    size,
    bold,
    muted,
    error,
    success,
    children
}) => {
    const css = `material-icons${typ ? `-${typ}` : ""} ${cls ? cls : ""}`;

    const style = {
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
