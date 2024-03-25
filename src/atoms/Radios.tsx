import { selectionInputProps } from "@/core/domain/states/Selection";

import React, { useState } from "react";

export const Radios = ({ name, options, onChange }: selectionInputProps) => {
    const [selectedValue, setSelectedValue] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSelectedValue(value);
        onChange({ value: value, index: options.indexOf(value) });
    };

    return (
        <div>
            {options.map((option, index) => (
                <label key={index}>
                    <input
                        name={name}
                        type="radio"
                        value={option}
                        checked={selectedValue === option}
                        onChange={handleChange}
                    />
                    {option}
                </label>
            ))}
        </div>
    );
};
