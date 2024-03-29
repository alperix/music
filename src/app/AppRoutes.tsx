import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { appRoutes, module, route } from "@/core/domain/Routes";
import { useCatchEvent } from "@/core/services/events/CustomEvents";

import { RouterLink } from "@/atoms/RouterLink";
import { ModuleView } from "@/modules/ModuleView";

const moduleKeys = Object.keys(appRoutes);
const moduleRoute = (m: module) => appRoutes[m];

export const Index = () => (
    <Route index element={<ModuleView module={moduleKeys[0]} />} />
);

export const AppRoute = (r: route) => (
    <Route
        index
        key={r.module}
        path={`${r.path}/*`}
        element={<ModuleView module={r.module} />}
    />
);

export const AppRoutes = () => {
    return (
        <Routes>
            {Index()}
            {moduleKeys.map((m) => AppRoute(moduleRoute(m)))}
        </Routes>
    );
};

export const AppLinks = () => {
    const [selected, setSelected] = useState<module | null>(null);

    useCatchEvent("module-changed", setSelected);

    return moduleKeys.map((m) => (
        <RouterLink key={m} route={moduleRoute(m)} selected={selected == m} />
    ));
};
