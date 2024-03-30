import { reportKey, selectionKey } from "@/core/resources/Types";
import { groupSelection, singleSelection } from "@/core/domain/ui/Selection";

export const resourceKeys = {
    filter: ["Fachgruppe", "Zentralfachgruppen", "Etiketten"] as selectionKey[],
    location: ["Standorte", "Facharten"] as selectionKey[],
    report: ["Schulerinnen", "Controlling", "Statistik"] as reportKey[]
};

const groupValues = (keys: string[]) =>
    keys.reduce((v, k) => {
        v[k] = { selected: "", index: -1 };
        return v;
    }, {} as groupSelection);

export const defaultState = {
    filter: groupValues(resourceKeys.filter),
    location: groupValues(resourceKeys.location),
    report: {} as singleSelection
};