import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { route } from "../core/domain/Routes";
import { Icon } from "./Icon";

type LinkProps = { route: route; selected?: boolean };

export const Link: React.FC<LinkProps> = ({ route, selected }) => {
    const active = `nav-link ${selected ? "active" : ""}`;

    return (
        <RouterLink to={route.path}>
            <div className={active}>
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
