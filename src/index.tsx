import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";

import { App } from "./app/App";
import "./index.scss";

const isDev = window.location.hostname === "localhost";
const root = createRoot(document.getElementById("root") as HTMLElement);

const MSV = (
    <HashRouter>
        <App />
    </HashRouter>
);

root.render(isDev ? MSV : <React.StrictMode>{MSV}</React.StrictMode>);
