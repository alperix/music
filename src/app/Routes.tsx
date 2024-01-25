import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

import { Empty } from "../atoms/Empty";
import { modules, route } from "../core/domain/Modules";
import { Link } from "../atoms/Link";

export const Routes = () => (
    <RoutesContainer>
        <Route index element={<Empty />} />
        {Object.keys(modules).map((key: string) => (
            <Route
                key={key}
                path={modules[key].path}
                element={<Empty />}
            />
        ))}
    </RoutesContainer>
);

export const Links = ({ onClick }: { onClick?: (r: route) => void }) =>
    Object.keys(modules).map((key: string) => (
        <Link
            key={key}
            route={modules[key]}
            onClick={() => onClick && onClick(modules[key])}
        />
    ));
