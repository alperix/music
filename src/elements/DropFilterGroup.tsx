import React from "react";

import lists from "@/core/resources/Lists.json"

import { groupSelection, selectionKey } from "@/core/domain/states/Selection";

import { Dropdown } from "@/atoms/Dropdown";

type Props = {
    values: groupSelection;
    resKeys: selectionKey[];
    onChange: (values: groupSelection) => void;
};

export const DropFilterGroup = ({ resKeys, values, onChange }: Props) => {

    return resKeys.map((rk) => (
        <Dropdown
            key={`${rk}-drop`}
            name={rk}
            value={values[rk]}
            options={lists.Selection[rk]}
            onChange={(value) => onChange({ ...values, [rk]: value })}
        />
    ));
};
