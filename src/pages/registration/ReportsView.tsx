import React from "react";

import { ReportsForm } from "@/components/registration/ReportsForm";
import { FeatureProp } from "@/core/domain/Routes";

export const ReportsView = ({ feature }: FeatureProp) => {
    return (<ReportsForm featureName={feature}/>);
};
