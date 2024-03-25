import React from "react";

import { groupSelection, selectionKey } from "@/core/domain/states/Selection";

import { RadioFilter } from "./RadioFilter";

type Props = {
    values: groupSelection;
    resKeys: selectionKey[];
    onChange: (values: groupSelection) => void;
};

export const RadioFilterGroup = ({ resKeys, values, onChange }: Props) => {

    return resKeys.map((rk) => (
        <RadioFilter
            key={`${rk}-filter`}
            resKey={rk}
            value={values[rk]}
            onChange={(key, value) => onChange({ ...values, [key]: value })}
        />
    ));
};
