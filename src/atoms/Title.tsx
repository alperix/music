import React, { PropsWithChildren } from "react";

type titleProps = PropsWithChildren & { title?: string };

export const Title = ({ title, children }: titleProps) =>
    (title || children) && <h2>{title || children}</h2>;
