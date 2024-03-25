import React from "react";

import lists from "@/core/resources/Lists.json";
import { selection, reportKey } from "@/core/domain/states/Selection";

import { Radios } from "@/atoms/Radios";

type Props = {
    value: selection | null
    resKey: reportKey;
    onChange: (key: string, value: selection) => void;
};

export const RadioReports = ({ resKey, value, onChange }: Props) => {
    return (
        <Radios       
            name={resKey}
            value={value}
            options={lists.Reports[resKey]}
            onChange={(value) => onChange(resKey, value)}
        />
    );
};
