import React from "react";

export const NotImplemented = ({ title }: { title?: string }) => (
    <div className="flex justify-center mt-16 text-3xl opacity-30">
        {title || "Not Implemented"}
    </div>
);
