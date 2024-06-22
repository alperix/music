import React from "react";
import { createRoot } from "react-dom/client";
import { FIREBASE, isDev } from "./core/services/Configuration";
import { FB } from "./core/services/fetch/Firebase";

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

console.log(FIREBASE.appId, FB?.name)