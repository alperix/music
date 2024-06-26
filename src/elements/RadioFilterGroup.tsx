import React from "react";

import { groupSelection } from "@/core/domain/ui/Selection";
import { selectionKey } from "@/core/resources/Types";

import { RadioFilter } from "./RadioFilter";

type Props = {
    values: groupSelection;
    resKeys: selectionKey[];
    onChange: (values: groupSelection) => void;
};

export const RadioFilterGroup = ({ resKeys, values, onChange }: Props) => {
    return (
        <div className="flex justify-start align-top gap-8">
            {resKeys.map((rk) => (
                <RadioFilter
                    key={`${rk}-filter`}
                    resKey={rk}
                    value={values[rk]}
                    onChange={(key, value) =>
                        onChange({ ...values, [key]: value })
                    }
                />
            ))}
        </div>
    );
};
