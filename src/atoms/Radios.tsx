import React from "react";

import { selectionInputProps } from "./Types";

export const Radios = ({
    name,
    value,
    options,
    onChange
}: selectionInputProps) => {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        onChange({ selected: value, index: options.indexOf(value) });
    };

    return (
        <div>
            {options.map((option, index) => (
                <div className="form-control" key={index}>
                    <label>
                        <input
                            name={name}
                            type="radio"
                            value={option}
                            checked={value?.selected === option}
                            onChange={handleChange}
                        />
                        {option}
                    </label>
                </div>
            ))}
        </div>
    );
};
