import React, { PropsWithChildren, useEffect } from "react";

import { emitEvent } from "@/core/services/events/CustomEvents";
import { FeatureProp } from "@/core/domain/Routes";

export const FeatureView = ({
    children,
    feature
}: PropsWithChildren & FeatureProp) => {
    useEffect(() => emitEvent("feature-changed", feature), [feature]);

    return (
        <section className="feature">
            <div className="feature-content">{children}</div>
        </section>
    );
};
