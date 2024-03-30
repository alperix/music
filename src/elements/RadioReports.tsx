import React from "react";

import lists from "@/core/resources/Lists.json";

import { selection } from "@/core/domain/ui/Selection";
import { reportKey } from "@/core/resources/Types";

import { Radios } from "@/atoms/Radios";
import { Label } from "@/atoms/Label";

type Props = {
    value: selection | null;
    resKey: reportKey;
    onChange: (key: string, value: selection) => void;
};

export const RadioReports = ({ resKey, value, onChange }: Props) => {
    return (
        <div>
            <div className="my-4">
                <Label text={resKey} htmlFor={resKey} />
            </div>
            <Radios
                name={resKey}
                value={value}
                options={lists.Reports[resKey]}
                onChange={(value) => onChange(resKey, value)}
            />
        </div>
    );
};
