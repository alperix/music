import React, { ReactNode, useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
    featureRoutes,
    ModuleProp,
    route,
    module,
    feature
} from "@/core/domain/Routes";
import { useCatchEvent } from "@/core/services/events/CustomEvents";

import { RouterLink } from "@/atoms/RouterLink";
import { FeatureView } from "@/pages/FeatureView";
import { ReportsView } from "@/pages/registration/ReportsView";

const routes = (m: module) => featureRoutes[m];

const component = (fr: route) => {  
    const views: Record<module, Record<feature, ReactNode>> = {
        registration: {
            reports: <ReportsView feature={fr.feature} />
        }
    };

    return (
        views[fr.module]?.[fr.feature] ?? <FeatureView feature={fr.feature} />
    );
};

export const Index = (m: module) => (
    <Route index element={component(routes(m)[0])} />
);

export const ModuleRoute = (fr: route) => (
    <Route key={fr.name} path={fr.path} element={component(fr)} />
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
        <RouterLink
            key={fr.name}
            route={{
                ...fr,
                path: `/${module}${fr.path}`
            }}
            selected={selected == fr.feature}
        />
    ));
};
