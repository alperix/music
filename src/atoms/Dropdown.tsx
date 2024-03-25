import React from "react";

import { selectionInputProps } from "@/core/domain/states/Selection";

export const Dropdown = ({ name, options, onChange }: selectionInputProps) => {
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        onChange({ value: value, index: options.indexOf(value) });
    };

    return (
        <select onChange={handleChange} name={name}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
