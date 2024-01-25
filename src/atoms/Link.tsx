import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { route } from "../core/domain/Modules";

type LinkProps = {
    route : route
    onClick?: (r: route) => void;
};

export const Link: React.FC<LinkProps> = ({ route, onClick }) => {
    return (
        <RouterLink to={route.path} onClick={() => onClick && onClick(route)}>
            <div className={`menu-link`}>{route.name}</div>
        </RouterLink>
    );
};
