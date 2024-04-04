import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { App } from "./app/App";
import { isDev } from "./core/services/Configuration";

import "./index.scss";

const APP = (
    <HashRouter>
        <App />
    </HashRouter>
);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(isDev ? APP : <React.StrictMode>{APP}</React.StrictMode>);
