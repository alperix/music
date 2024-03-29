import React, { ReactNode } from "react";

import { feature, route } from "@/core/domain/Routes";
import { ReportsView } from "./ReportsView";

export const RegistrationRegister = (fr: route) => {  
    const views: Record<feature, ReactNode> = {
        reports: <ReportsView feature={fr.name} />
    };
    
    return views[fr.feature] ?? null;
};
