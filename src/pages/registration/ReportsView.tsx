import React, { useEffect } from "react";

import { emitEvent } from "@/core/services/events/CustomEvents";
import { FeatureProp, features } from "@/core/domain/Routes";
import { ReportsForm } from "@/components/registration/ReportsForm";

import { FeatureContent } from "../FeatureContent";

export const ReportsView = ({ feature }: FeatureProp) => {
    useEffect(() => emitEvent("feature-changed", feature), [feature]);

    return (
        <FeatureContent>
            <ReportsForm feature={features[feature]}/>
        </FeatureContent>
    );
};
