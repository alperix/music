import React from "react";

import { AppRoutes, AppLinks } from "./AppRoutes";
import { emitEvent } from "../core/hooks/CustomEvents";

export const Content = () => (
    <section
        className="content"
        onClick={() => emitEvent("toggle-burger", false)}
    >
        <nav className="left-nav">
            <AppLinks />
        </nav>
        <section className="app-content">
            <AppRoutes />
        </section>
    </section>
);
