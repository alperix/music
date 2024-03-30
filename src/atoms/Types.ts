import { selection } from "@/core/domain/ui/Selection";

export type selectionInputProps = {
    name: string
    value: selection | null
    options: string[]
    onChange: (value: selection) => void
    required?: boolean
    disabled?: boolean
};
