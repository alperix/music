import React from "react";

import { selectionInputProps } from "@/core/domain/states/Selection";

export const Radios = ({ name, value, options, onChange }: selectionInputProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onChange({ selected: value, index: options.indexOf(value) });
    };

    return (
        <div>
            {options.map((option, index) => (
                <label key={index}>
                    <input
                        name={name}
                        type="radio"
                        value={option}
                        checked={value?.selected === option}
                        onChange={handleChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};
