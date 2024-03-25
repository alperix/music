import React, { PropsWithChildren } from "react";

type FormProps = PropsWithChildren & {
    id : string
}

export const FormContainer: React.FC<FormProps> = ({ children, id, ...restProps }) => (
	<section>
		<form
			className="form-container"
			id={id}
			{...restProps}
		>
			{children}
		</form>
	</section>
);

export default FormContainer;
