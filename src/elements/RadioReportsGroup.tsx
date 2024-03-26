import React from "react";

import { reportKey, singleSelection } from "@/core/domain/states/Selection";

import { RadioReports } from "./RadioReports";

type Props = {
    value: singleSelection | null;
    resKeys: reportKey[];
    onChange: (value: singleSelection) => void;
};

export const RadioReportsGroup = ({ resKeys, value, onChange }: Props) => {
    return (
        <div className="flex justify-start align-top gap-8">
            {resKeys.map((rk) => (
                <RadioReports
                    key={`${rk}-reports`}
                    resKey={rk}
                    value={value && value.key === rk ? value : null}
                    onChange={(key, value) => onChange({ key, ...value })}
                />
            ))}
        </div>
    );
};
