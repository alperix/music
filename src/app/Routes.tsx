import React from "react";
import { Route, Routes  } from "react-router-dom";

import { appRoutes, route } from "../core/domain/Modules";
import { Link } from "../atoms/Link";

import { ModuleView } from "../modules/ModuleView";
import { NotImplemented } from "../atoms/NotImplemented";

export const AppRoutes = () => (
    <Routes>
        <Route index element={<NotImplemented title="Home" />} />
        {Object.keys(appRoutes).map((module: string) => (
            <Route
                key={module}
                path={`${appRoutes[module].path}/*`}
                element={<ModuleView module={module} />}
            />
        ))}
    </Routes>
);

export const AppLinks = ({ onClick }: { onClick?: (r: route) => void }) =>
    Object.keys(appRoutes).map((module: string) => (
        <Link
            key={module}
            route={appRoutes[module]}
            onClick={() => onClick && onClick(appRoutes[module])}
        />
    ));
