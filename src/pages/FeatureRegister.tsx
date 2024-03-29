import { module, route } from "@/core/domain/Routes";
import React, { ReactNode } from "react";

import { FeatureView } from "./FeatureView";
import { NotImplemented } from "./NotImplemented";

import { RegistrationRegister } from "./registration/RegistrationRegister";

type register = Record<module, (fr: route) => ReactNode | null>;

const moduleRegisters: register = {
    registration: RegistrationRegister
};

export const FeatureComponent = (fr: route) => {
    return (
        <FeatureView feature={fr.feature}>
            {moduleRegisters[fr.module]?.(fr) ?? <NotImplemented title={fr.name}/>}
        </FeatureView>
    );
};
