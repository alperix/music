import React, { useEffect } from "react";

import { emitEvent } from "@/core/services/events/CustomEvents";
import { FeatureProp, features } from "@/core/domain/Routes";
import { NotImplemented } from "@/atoms/NotImplemented";

import { FeatureContent } from "./FeatureContent";

export const FeatureView = ({ feature }: FeatureProp) => {
    useEffect(() => emitEvent("feature-changed", feature), [feature]);

    return (
        <FeatureContent>
            <NotImplemented title={features[feature]}/>
        </FeatureContent>
    );
};
