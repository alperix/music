import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
    featureRoutes,
    ModuleProp,
    route,
    module,
    feature
} from "../core/domain/Routes";

import { Link } from "../atoms/Link";
import { FeatureView } from "../pages/FeatureView";
import { useCatchEvent } from "../core/services/CustomEvents";

const routes = (m: module) => featureRoutes[m];

export const Index = (m: module) => (
    <Route index element={<FeatureView feature={routes(m)[0].feature} />} />
);

export const ModuleRoute = (fr: route) => (
    <Route
        key={fr.name}
        path={fr.path}
        element={<FeatureView feature={fr.feature} />}
    />
);

export const ModuleRoutes = ({ module }: ModuleProp) => (
    <Routes>
        {Index(module)}
        {routes(module).map((fr) => ModuleRoute(fr))}
    </Routes>
);

export const ModuleLinks = ({ module }: ModuleProp) => {
    const [selected, setSelected] = useState<feature | null>(null);

    useCatchEvent("feature-changed", setSelected);

    return routes(module).map((fr) => (
        <Link
            key={fr.name}
            route={{
                ...fr,
                path: `/${module}${fr.path}`
            }}
            selected={selected == fr.feature}
        />
    ));
};
