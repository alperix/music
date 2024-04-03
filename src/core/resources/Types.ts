import lists from "./Lists.json"

export type reportKey = keyof typeof lists.Reports;
export type selectionKey = keyof typeof lists.Selection;

export const isSelectionKey = (key: string) => Object.keys(lists.Selection).includes(key);