import React from "react";

import lists from "@/core/resources/Lists.json";
import { selection, selectionKey } from "@/core/domain/states/Selection";

import { Radios } from "@/atoms/Radios";

type Props = {
    resKey: selectionKey;
    onChange: (key: string, value: selection) => void;
};

export const RadioFilter = ({ resKey, onChange }: Props) => {
    return (
        <Radios
            name={resKey}
            options={lists.Selection[resKey]}
            onChange={(value) => onChange(resKey, value)}
        />
    );
};
