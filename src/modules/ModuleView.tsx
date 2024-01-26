import React from "react";
import { ModuleContent } from "./ModuleContent";
import { ModuleLinks, ModuleRoutes } from "./Routes";

export const ModuleView = ({ module }: { module: string }) => {
    return (
        <ModuleContent>
            <nav className="module-nav">
                <ModuleLinks module={module} />
            </nav>
            <div className="routes">
                <ModuleRoutes module={module} />
            </div>
        </ModuleContent>
    );
};
