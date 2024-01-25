import React from "react";
import { Link as RouterLink } from "react-router-dom";

type LinkProps = {
    to: string;
    text: string;
    onClick?: () => void;
};

export const Link: React.FC<LinkProps> = ({ to, text, onClick }) => {
    return (
        <RouterLink to={to} onClick={onClick}>
            <div className={`menu-link`}>{text}</div>
        </RouterLink>
    );
};
