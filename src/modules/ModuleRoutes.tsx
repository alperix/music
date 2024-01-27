import React from "react";
import { Route, Routes } from "react-router-dom";

import { moduleRoutes, ModuleProp, route } from "../core/domain/Routes";
import { Link } from "../atoms/Link";
import { NotImplemented } from "../atoms/NotImplemented";

export const ModuleRoot = (r: route) => (
    <Route
        key={r.name}
        path={r.path}
        element={<NotImplemented title={r.name} />}
    />
);

export const ModuleRoutes = ({ module }: ModuleProp) => {
    const routes = moduleRoutes[module];

    return (
        <Routes>
            <Route index element={<NotImplemented title={routes[0].name} />} />
            {routes.map(ModuleRoot)}
        </Routes>
    );
};

export const ModuleLinks = ({ module }: ModuleProp) =>
    moduleRoutes[module].map((r) => (
        <Link
            key={r.name}
            route={{
                ...r,
                path: `/${module}${r.path}`
            }}
        />
    ));
