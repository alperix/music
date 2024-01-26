import React from "react";

export const NotImplemented = ({ title }: { title?: string }) => (
    <div className="centered-content">
        <div className="content-container">
            <div className="flex justify-center mt-40 text-3xl opacity-30">
                {title || "Not Implemented"}
            </div>
        </div>
    </div>
);
