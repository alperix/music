import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { App } from "./app/App";

import "./index.scss";

export const baseUrl = process.env.VITE_PUBLIC_URL;
export const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
);
