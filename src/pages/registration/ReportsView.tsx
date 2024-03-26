import React, { useEffect } from "react";

import { emitEvent } from "@/core/services/CustomEvents";
import { FeatureProp, features } from "@/core/domain/Routes";
import { FeatureContent } from "../FeatureContent";
import { ReportsForm } from "@/components/registration/ReportsForm";

export const ReportsView = ({ feature }: FeatureProp) => {
    useEffect(() => emitEvent("feature-changed", feature), [feature]);

    return (
        <FeatureContent>
            <ReportsForm feature={features[feature]}/>
        </FeatureContent>
    );
};
