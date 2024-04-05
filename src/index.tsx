import React from "react";
import { createRoot } from "react-dom/client";
import { isDev } from "./core/services/Configuration";

import "./index.scss";

import { Root } from "./app/Root";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    isDev ? (
        <Root />
    ) : (
        <React.StrictMode>
            <Root />
        </React.StrictMode>
    )
);
