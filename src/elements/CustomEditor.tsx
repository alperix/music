import React from "react";

import lists from "@/core/resources/Lists.json";

import { isSelectionKey, selectionKey } from "@/core/resources/Types";
import { groupEditorData, selection } from "@/core/domain/ui/Selection";

import { Dropdown } from "@/atoms/Dropdown";
import { LabelContainer } from "@/atoms/Label";
import { ValidInput } from "@/atoms/ValidInput";
import { Validator } from "@/atoms/Validator";

type Props = {
    values: groupEditorData;
    keys: string[];
    onChange: (values: groupEditorData) => void;
};

export const CustomEditor = ({ keys, values, onChange }: Props) => {
    const drops = keys.filter((k) => isSelectionKey(k)) as selectionKey[];

    const i1 = keys[2]; // numeric-input
    const i2 = keys[3]; // string-input

    return (
        <div className="flex flex-col gap-4 bg-slate-100 p-8 w-full">
            {drops.map((sk) => (
                <LabelContainer key={`${sk}-drop`} text={sk} htmlFor={sk} horizontal>
                    <Dropdown
                        name={sk}
                        value={values[sk] as selection}
                        options={lists.Selection[sk]}
                        onChange={(value) =>
                            onChange({ ...values, [sk]: value })
                        }
                    />
                    <Validator
                        name={sk}
                        value={values[sk] as selection}
                        validation
                        rules={["SELECT"]}
                    />
                </LabelContainer>
            ))}
            <LabelContainer text={i1} htmlFor={i1} full>
                <ValidInput
                    name={i1}
                    value={values[i1] as string}
                    onChange={(value) => onChange({ ...values, [i1]: value })}
                    validation
                    required
                    rules={["INTABS"]}
                    min={1}
                    max={64}
                />
            </LabelContainer>
            <LabelContainer text={i2} htmlFor={i2} full>
                <ValidInput
                    name={i2}
                    value={values[i2] as string}
                    onChange={(value) => onChange({ ...values, [i2]: value })}
                    validation
                    required
                    minLength={3}
                    maxLength={8}
                />
            </LabelContainer>
        </div>
    );
};
