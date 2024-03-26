import React from "react";

import lists from "@/core/resources/Lists.json";

import { groupSelection, selectionKey } from "@/core/domain/states/Selection";

import { Dropdown } from "@/atoms/Dropdown";
import { Label } from "@/atoms/Label";

type Props = {
    values: groupSelection;
    resKeys: selectionKey[];
    onChange: (values: groupSelection) => void;
};

export const DropFilterGroup = ({ resKeys, values, onChange }: Props) => {
    return (
        <div className="flex flex-col gap-4 bg-slate-100 p-4">
            {resKeys.map((rk) => (
                <div
                    className="flex align-center justify-start gap-4"
                    key={`${rk}-drop`}
                >
                    <div className="my-2">
                        <Label text={rk} htmlFor={rk} />
                    </div>
                    <Dropdown
                        name={rk}
                        value={values[rk]}
                        options={lists.Selection[rk]}
                        onChange={(value) =>
                            onChange({ ...values, [rk]: value })
                        }
                    />
                </div>
            ))}
        </div>
    );
};
