import React, { useState } from "react";

import FormContainer from "@/atoms/FormContainer";

import { RadioFilterGroup } from "@/elements/RadioFilterGroup";
import { DropFilterGroup } from "@/elements/DropFilterGroup";
import { RadioReportsGroup } from "@/elements/RadioReportsGroup";

import {
    groupSelection,
    reportKey,
    selectionKey,
    singleSelection
} from "@/core/domain/states/Selection";

const reskeys = {
    filter: ["Fachgruppe", "Zentralfachgruppen", "Etiketten"] as selectionKey[],
    location: ["Standorte", "Facharten"] as selectionKey[],
    report: ["Schulerinnen", "Controlling", "Statistik"] as reportKey[]
};

const values = (keys: string[]) =>
    keys.reduce((v, k) => {
        v[k] = { selected: "", index: -1 };
        return v;
    }, {} as groupSelection);

const initialState = {
    filter: values(reskeys.filter),
    location: values(reskeys.location),
    report: {} as singleSelection
};

export const ReportsForm = ({ feature }: { feature: string }) => {
    const [data, setData] = useState(initialState);

    const submit = (report: singleSelection) => {
        setData({ ...data, report: report });
        console.log(report, data);
    };

    return (
        <FormContainer id={`registration-${feature}-form`}>
            <RadioFilterGroup
                resKeys={reskeys.filter}
                values={data.filter}
                onChange={(values) => setData({ ...data, filter: values })}
            />
            <DropFilterGroup
                resKeys={reskeys.location}
                values={data.location}
                onChange={(values) => setData({ ...data, location: values })}
            />
            <RadioReportsGroup
                resKeys={reskeys.report}
                value={data.report}
                onChange={submit}
            />
        </FormContainer>
    );
};
