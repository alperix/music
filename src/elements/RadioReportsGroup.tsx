import React from "react";

import { groupSelection, reportKey } from "@/core/domain/states/Selection";

import { RadioReports } from "./RadioReports";

type Props = {
    values: groupSelection;
    resKeys: reportKey[];
    onChange: (values: groupSelection) => void;
};

export const RadioFilterGroup = ({ resKeys, values, onChange }: Props) => {
    return resKeys.map((rk) => (
        <RadioReports
            key={`${rk}-reports`}
            resKey={rk}
            value={values[rk]}
            onChange={(key, value) => onChange({ ...values, [key]: value })}
        />
    ));
};
