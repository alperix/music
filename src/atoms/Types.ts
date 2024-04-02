import { InputHTMLAttributes } from "react";

import { selection } from "@/core/domain/ui/Selection";

export type InputElementProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
> & {
    value: string;
    onChange: (value: string) => void;
};

export type selectionInputProps = {
    name: string;
    value: selection | null;
    options: string[];
    onChange: (value: selection) => void;
    required?: boolean;
    disabled?: boolean;
};
