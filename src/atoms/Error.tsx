import React, { PropsWithChildren, ReactNode } from "react";

type errorProps = PropsWithChildren & { error?: ReactNode };

export const ErrorDiv = ({ error, children }: errorProps) =>
    (error || children) && (
        <div className="text-sm text-red-600 pt-1">{children || error}</div>
    );
