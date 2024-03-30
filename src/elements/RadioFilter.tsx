import React from "react";

import lists from "@/core/resources/Lists.json";

import { selection } from "@/core/domain/ui/Selection";
import { selectionKey } from "@/core/resources/Types";

import { Radios } from "@/atoms/Radios";
import { Label } from "@/atoms/Label";

type Props = {
    value: selection | null;
    resKey: selectionKey;
    onChange: (key: string, value: selection) => void;
};

export const RadioFilter = ({ resKey, value, onChange }: Props) => {
    return (
        <div>
            <div className="my-4">
                <Label text={resKey} htmlFor={resKey} />
            </div>
            <Radios
                name={resKey}
                value={value}
                options={lists.Selection[resKey]}
                onChange={(value) => onChange(resKey, value)}
            />
        </div>
    );
};
