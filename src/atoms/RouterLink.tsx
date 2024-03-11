import React from "react";
import { Link } from "react-router-dom";
import { route } from "../core/domain/Routes";
import { Icon } from "./Icon";

type LinkProps = { route: route; selected?: boolean };

export const RouterLink: React.FC<LinkProps> = ({ route, selected }) => {
    const active = `nav-link ${selected ? "active" : ""}`;

    return (
        <Link to={route.path}>
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
        </Link>
    );
};
