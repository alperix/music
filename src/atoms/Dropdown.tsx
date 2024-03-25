import React from "react";

import { selectionInputProps } from "@/core/domain/states/Selection";

export const Dropdown = ({ name, value, options, onChange }: selectionInputProps) => {
    
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        onChange({ selected: value, index: options.indexOf(value) });
    };

    return (
        <select onChange={handleChange} name={name} value={value?.selected ?? ""}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
