import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { route } from "../core/domain/Modules";
import { Icon } from "./Icon";

type LinkProps = {
    route: route;
    onClick?: (r: route) => void;
};

export const Link: React.FC<LinkProps> = ({ route, onClick }) => {
    return (
        <RouterLink to={route.path} onClick={() => onClick && onClick(route)}>
            <div className="nav-link">
                {route.icon && (
                    <Icon
                        icon={route.icon}
                        alt={route.name}
                        typ="outlined"
                        muted
                        size={2}
                    />
                )}
                <div className="link-text">{route.name}</div>
            </div>
        </RouterLink>
    );
};
