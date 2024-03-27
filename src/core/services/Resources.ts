import texts from "@/core/resources/Texts.json";

type NestedText = {
    [key: string]: NestedText | string;
};

export const getResource = (obj: NestedText, path: string): string => {
    const props = path.split(".");

    if (props.length === 1) {
        return obj[path] as string;
    }

    const [cur, ...rest] = props;
    return getResource(obj[cur] as NestedText, rest.join("."));
};

export const setTemplate = (text: string, vars: Record<string, unknown>) => {
    let result = text;

    Object.keys(vars).forEach(
        (key) => (result = result.replace(`{${key}}`, vars[key] as string))
    );

    return result;
};

export const Text = (
    path: string,
    vars: Record<string, string> | null = null
) => {
    let text = getResource(texts, path) || `!Resource[${path}]`;
    if (vars) text = setTemplate(text, vars);
    return text;
};

