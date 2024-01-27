import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { appRoutes, module } from "../core/domain/Routes";
import { Link } from "../atoms/Link";

import { ModuleView } from "../modules/ModuleView";
import { NotImplemented } from "../atoms/NotImplemented";
import { useCatchEvent } from "../core/hooks/CustomEvents";

export const AppRoute = (m: module) => (
    <Route
        key={m}
        path={`${appRoutes[m].path}/*`}
        element={<ModuleView module={m} />}
    />
);

export const AppRoutes = () => (
    <Routes>
        <Route index element={<NotImplemented title="Home" />} />
        {Object.keys(appRoutes).map(AppRoute)}
    </Routes>
);

export const AppLinks = () => {
    const [selected, setSelected] = useState<module | null>(null);

    useCatchEvent("module-changed", setSelected);

    return Object.keys(appRoutes).map((m) => (
        <Link key={m} route={appRoutes[m]} selected={selected == m} />
    ));
};
