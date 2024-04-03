import React, { FormHTMLAttributes, PropsWithChildren } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement> & PropsWithChildren;

export const FormContainer: React.FC<FormProps> = ({
    id,
    children,
    ...restProps
}) => (
    <form className="form-container" id={id} {...restProps}>
        {children}
    </form>
);

export default FormContainer;
