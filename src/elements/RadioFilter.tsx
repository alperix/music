import React from "react";

import lists from "@/core/resources/Lists.json";
import { selection, selectionKey } from "@/core/domain/states/Selection";

import { Radios } from "@/atoms/Radios";

type Props = {
    value: selection | null
    resKey: selectionKey
    onChange: (key: string, value: selection) => void
};

export const RadioFilter = ({ resKey, value, onChange }: Props) => {
    return (
        <Radios
            name={resKey}
            value={value}
            options={lists.Selection[resKey]}
            onChange={(value) => onChange(resKey, value)}
        />
    );
};
