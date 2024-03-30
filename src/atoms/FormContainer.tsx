import React, { FormHTMLAttributes, PropsWithChildren } from "react";

type FormProps = FormHTMLAttributes<HTMLFormElement> & PropsWithChildren 

export const FormContainer: React.FC<FormProps> = ({
	id,
    children,
    ...restProps
}) => (
    <section>
        <form className="form-container" id={id} {...restProps}>
            {children}
        </form>
    </section>
);

export default FormContainer;
