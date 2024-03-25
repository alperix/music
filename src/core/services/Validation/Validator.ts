import { useEffect, useState, useCallback } from "react";

import { Rules } from "./Rules";

export const useValidator = () => {
	const [value, setValue] = useState("");
	const [valid, setValid] = useState(true);
	const [error, setError] = useState("");

	const [deal, setDeal] = useState({
		required: false,
		requiredMsg: null,
		rules: "",
		custom: null
	});

	const validate = useCallback(() => {
        const ruleKeys = Object.keys(Rules);

		const keys =
			deal.rules && value
				? deal.rules
						.toUpperCase()
						.split(",")
						.map((r) => r.trim())
                        .filter(k => ruleKeys.includes(k))
				: [];

		if (deal.required) keys.unshift("REQ");

		const rules = keys.reduce((r , key) => {
				r[key] = Rules[key as keyof typeof Rules];
				return r;
			}, {} as Record<string, (v:string) => string>);

		if (deal.custom && value) rules.custom = deal.custom;

		let msg = "";

		Object.keys(rules).forEach((key) => {
			if (msg) return msg;
			const rule = rules[key];

			msg = rule(value);
			
			if (key === "REQ" && msg && deal.requiredMsg)
				msg = deal.requiredMsg;
		});

		return msg;
	}, [deal, value]);

	useEffect(() => {
		const err = validate();
		setError(err);
		setValid(!err);
	}, [validate]);

	return { setValue, setDeal, valid, error };
};
