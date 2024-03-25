import lists from "@/core/resources/Lists.json";

export type selection = {
    index: number;
    selected: string;
};

export type multiSelection = selection[];

export type groupSelection = Record<string, selection>

export type selectionInputProps = {
    name: string
    value: selection | null
    options: string[]
    onChange: (value: selection) => void
};

export type reportKey = keyof typeof lists.Reports;
export type selectionKey = keyof typeof lists.Selection;
