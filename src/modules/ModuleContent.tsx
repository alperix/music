import React, { PropsWithChildren } from "react";

export const ModuleContent = ({ children }: PropsWithChildren) => (
    <div className="module-content">
        <div className="centered-content">
            <div className="content-container">{children}</div>
        </div>
    </div>
);
