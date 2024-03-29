import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import {
    featureRoutes,
    ModuleProp,
    route,
    module,
    feature
} from "@/core/domain/Routes";
import { RouterLink } from "@/atoms/RouterLink";
import { useCatchEvent } from "@/core/services/events/CustomEvents";
import { FeatureComponent } from "@/pages/FeatureRegister";

const routes = (m: module) => featureRoutes[m];

export const Index = (fr: route) => (
    <Route index element={FeatureComponent(fr)} />
);

export const ModuleRoute = (fr: route) => (
    <Route key={fr.name} path={fr.path} element={FeatureComponent(fr)} />
);

export const ModuleRoutes = ({ module }: ModuleProp) => (
    <Routes>
        {Index(routes(module)[0])}
        {routes(module).map((fr) => ModuleRoute(fr))}
    </Routes>
);

export const ModuleLinks = ({ module }: ModuleProp) => {
    const [selected, setSelected] = useState<feature | null>(null);

    useCatchEvent("feature-changed", setSelected);

    return routes(module).map((fr) => (
        <RouterLink
            key={fr.name}
            route={fr}
            selected={selected == fr.feature}
        />
    ));
};
