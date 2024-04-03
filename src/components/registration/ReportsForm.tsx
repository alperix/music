import React, { useState } from "react";

import FormContainer from "@/atoms/FormContainer";

import { singleSelection } from "@/core/domain/ui/Selection";
import {
    defaultState,
    resourceKeys
} from "@/core/domain/defaults/registration/ReportsFormState";

import { RadioFilterGroup } from "@/elements/RadioFilterGroup";
import { RadioReportsGroup } from "@/elements/RadioReportsGroup";
import { CustomEditor } from "@/elements/CustomEditor";

export const ReportsForm = ({ featureName }: { featureName: string }) => {
    const [data, setData] = useState(defaultState);

    const submit = (report: singleSelection) => {
        setData({ ...data, report: report });
        console.log(report.key, report.selected, data);
    };

    return (
        <FormContainer id={`registration-${featureName}-form`}>
            <RadioFilterGroup
                resKeys={resourceKeys.filter}
                values={data.filter}
                onChange={(values) => setData({ ...data, filter: values })}
            />
            <CustomEditor
                keys={resourceKeys.editor}
                values={data.editor}
                onChange={(values) => setData({ ...data, editor: values })}
            />
            <RadioReportsGroup
                resKeys={resourceKeys.report}
                value={data.report}
                onChange={submit}
            />
        </FormContainer>
    );
};
