import React from "react";
import { Route, Routes as RoutesContainer } from "react-router-dom";

import { Empty } from "../atoms/Empty";
import { modules } from "../core/domain/Modules";
import { Link } from "../atoms/Link";

export const Routes = () => (
    <RoutesContainer>
        <Route index element={<Empty title="Home" />} />
        {Object.keys(modules).map((key: string) => (
            <Route
                key={key}
                path={modules[key].path}
                element={<Empty title={modules[key].name} />}
            />
        ))}
    </RoutesContainer>
);

export const Links = ({ onClick }: { onClick?: () => void }) =>
    Object.keys(modules).map((key: string) => (
        <Link
            key={key}
            to={modules[key].path}
            text={modules[key].name}
            onClick={onClick}
        />
    ));
