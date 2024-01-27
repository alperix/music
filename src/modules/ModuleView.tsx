import React, { useEffect } from "react";
import { ModuleContent } from "./ModuleContent";
import { ModuleLinks, ModuleRoutes } from "./ModuleRoutes";

import { emitEvent } from "../core/hooks/CustomEvents";
import { ModuleProp } from "../core/domain/Routes";

export const ModuleView = ({ module }: ModuleProp) => {
    useEffect(() => emitEvent("module-changed", module), [module]);

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
