import React from "react";

export const Empty = ({ title }: { title: string }) => (
    <div className="centered-content">
        <div className="content-container">
            <h3>{title}</h3>
        </div>
    </div>
);
