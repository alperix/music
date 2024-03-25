import React from "react";

import lists from "@/core/resources/Lists.json";
import { selection, reportKey } from "@/core/domain/states/Selection";

import { Radios } from "@/atoms/Radios";

type Props = {
    resKey: reportKey;
    onChange: (key: string, value: selection) => void;
};

export const RadioFilter = ({ resKey, onChange }: Props) => {
    return (
        <Radios
            name={resKey}
            options={lists.Reports[resKey]}
            onChange={(value) => onChange(resKey, value)}
        />
    );
};
