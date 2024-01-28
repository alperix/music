import React, { useEffect } from "react";

import { emitEvent } from "../core/services/CustomEvents";
import { FeatureProp, features } from "../core/domain/Routes";
import { FeatureContent } from "./FeatureContent";
import { NotImplemented } from "../atoms/NotImplemented";

export const FeatureView = ({ feature }: FeatureProp) => {
    useEffect(() => emitEvent("feature-changed", feature), [feature]);

    return (
        <FeatureContent>
            <NotImplemented title={features[feature]}/>
        </FeatureContent>
    );
};
