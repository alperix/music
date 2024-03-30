export type selection = {
    index: number;
    selected: string;
};

export type groupSelection = Record<string, selection>
export type singleSelection = selection & { key: string }