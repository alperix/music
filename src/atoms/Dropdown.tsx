import React from "react";

import { selectionInputProps } from "./Types";

export const Dropdown = ({ name, value, options, onChange }: selectionInputProps) => {

    options = ["", ...options];
    value = value ?? { selected: "", index: -1 };
  
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        onChange({ selected: value, index: options.indexOf(value) - 1 });
    };

    return (
        <select onChange={handleChange} name={name} value={value.selected}>
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
