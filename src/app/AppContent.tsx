import React from "react";

import { AppRoutes, AppLinks } from "./AppRoutes";
import { emitEvent } from "@/core/services/events/CustomEvents";

export const AppContent = () => (
    <section
        className="app-content"
        onClick={() => emitEvent("toggle-burger", false)}
    >
        <nav className="app-nav">
            <AppLinks />
        </nav>
        <div className="app-routes">
            <AppRoutes />
        </div>
    </section>
);
