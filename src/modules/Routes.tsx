import React from "react";
import { Route, Routes } from "react-router-dom";

import { moduleRoutes, route } from "../core/domain/Modules";
import { Link } from "../atoms/Link";

import { NotImplemented } from "../atoms/NotImplemented";

export const ModuleRoutes = ({ module }: { module: string }) => {
    const routes = moduleRoutes[module];

    return (
        <Routes>
            <Route index element={<NotImplemented title={routes[0].name} />} />
            {routes.map((r: route) => {
                return (
                    <Route
                        key={r.name}
                        path={r.path}
                        element={<NotImplemented title={r.name} />}
                    />
                );
            })}
        </Routes>
    );
};

export const ModuleLinks = ({
    module,
    onClick
}: {
    module: string;
    onClick?: (r: route) => void;
}) => {
    const links = moduleRoutes[module] || [];

    return links.map((r: route) => {
        const link: route = {
            ...r,
            path: `/${module}${r.path}`
        };

        return (
            <Link
                key={r.name}
                route={link}
                onClick={() => onClick && onClick(link)}
            />
        );
    });
};
