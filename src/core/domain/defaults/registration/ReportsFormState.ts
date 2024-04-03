import { reportKey, selectionKey, isSelectionKey } from "@/core/resources/Types";

import {
    groupEditorData,
    groupSelection,
    singleSelection
} from "@/core/domain/ui/Selection";

export const resourceKeys = {
    filter: ["Fachgruppe", "Zentralfachgruppen", "Etiketten"] as selectionKey[],
    editor: ["Standorte", "Facharten", "Numeric-input", "String-input"] as string[],
    report: ["Schulerinnen", "Statistik", "Controlling"] as reportKey[]
};

const filterValues = (keys: selectionKey[]) =>
    keys.reduce((v, k) => {
        v[k] = { selected: "", index: -1 };
        return v;
    }, {} as groupSelection);

const editorValues = (keys: string[]) =>
    keys.reduce((v, k) => {
        v[k] = isSelectionKey(k) ? { selected: "", index: -1 } : "";
        return v;
    }, {} as groupEditorData);

export const defaultState = {
    filter: filterValues(resourceKeys.filter),
    editor: editorValues(resourceKeys.editor),
    report: {} as singleSelection
};
