export type selection = {
    index: number;
    selected: string;
};

export type singleSelection = selection & { key: string }
export type groupSelection = Record<string, selection>
export type groupEditorData = Record<string, selection | string>
