import React, { useState } from "react";

import FormContainer from "@/atoms/FormContainer";

import { singleSelection } from "@/core/domain/states/Selection";
import {
    defaultState,
    resourceKeys
} from "@/core/domain/defaults/registration/ReportsFormState";

import { RadioFilterGroup } from "@/elements/RadioFilterGroup";
import { DropFilterGroup } from "@/elements/DropFilterGroup";
import { RadioReportsGroup } from "@/elements/RadioReportsGroup";

export const ReportsForm = ({ featureName }: { featureName: string }) => {
    const [data, setData] = useState(defaultState);

    const submit = (report: singleSelection) => {
        setData({ ...data, report: report });
        console.log(report, data);
    };

    return (
        <FormContainer id={`registration-${featureName}-form`}>
            <RadioFilterGroup
                resKeys={resourceKeys.filter}
                values={data.filter}
                onChange={(values) => setData({ ...data, filter: values })}
            />
            <DropFilterGroup
                resKeys={resourceKeys.location}
                values={data.location}
                onChange={(values) => setData({ ...data, location: values })}
            />
            <RadioReportsGroup
                resKeys={resourceKeys.report}
                value={data.report}
                onChange={submit}
            />
        </FormContainer>
    );
};
