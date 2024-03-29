import React, { useEffect } from "react";

import { emitEvent } from "@/core/services/events/CustomEvents";
import { ModuleProp } from "@/core/domain/Routes";

import { ModuleLinks, ModuleRoutes } from "./ModuleRoutes";

export const ModuleView = ({ module }: ModuleProp) => {
    useEffect(() => emitEvent("module-changed", module), [module]);

    return (
        <section className="module">
            <nav className="module-nav">
                <ModuleLinks module={module} />
            </nav>
            <div className="module-content">
                <ModuleRoutes module={module} />
            </div>
        </section>
    );
};
