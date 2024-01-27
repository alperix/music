export const modules: Record<string, string> = {
    administration: "Administration",
    registration: "Anmeldung",
    freePlaces: "Freie Plätze",
    teachers: "Lehrer*innen",
    students: "Schüler*innen",
    representatives: "Vertreter*innen",
    teachingFees: "Unterrichtsgebühren",
    instruments: "Instrumente",
    discounts: "Ermäßigungen"
};

export const features: Record<string, string> = {
    refresh: "Aktualisierung",
    reports: "Berichte",
    forms: "Formulare",
    mailing: "Verteilerliste",
    maindata: "Stammdaten",
    relocation: "Standortwechsel",
    subsets: "Fächer",
    labels: "Etiketten",
    invoices: "Rechnungen",
    export: "Export",
    print: "Drucken",
    manuals: "Handbücher",
    hr: "Personalreferat"
};

export const featureIcons: Record<string, string> = {
    refresh: "sync",
    reports: "poll",
    forms: "list_alt",
    mailing: "forward_to_inbox",
    maindata: "contact_phone",
    relocation: "person_pin_circle",
    subsets: "piano",
    labels: "more",
    invoices: "request_quote",
    export: "file_download",
    print: "print",
    manuals: "help_center",
    hr: "recent_actors"
};

export const moduleFeatures: Record<string, string[]> = {
    administration: ["refresh", "reports", "forms"],
    registration: ["reports", "maindata", "relocation", "mailing"],
    freePlaces: ["reports", "subsets"],
    teachers: ["reports", "maindata", "mailing"],
    students: ["refresh", "reports", "maindata", "mailing", "labels"],
    representatives: ["reports", "maindata"],
    teachingFees: ["reports", "invoices", "export"],
    instruments: ["reports", "forms", "invoices"],
    discounts: ["reports"]
};

export type module = keyof typeof modules;
export type ModuleProp = { module: module }
export type feature = keyof typeof features;
export type FeatureProp = { feature: feature }

export type route = {
    name: string;
    path: string;
    icon?: string;
};

export const appRoutes: Record<string, route> = Object.keys(modules).reduce(
    (routes, key) => ({
        ...routes,
        [key]: { name: modules[key], path: `/${key}` }
    }),
    {}
);

export const moduleRoutes: Record<string, route[]> = Object.keys(modules).reduce(
    (routes, key) => ({
        ...routes,
        [key]: moduleFeatures[key].map(f => ({
            name: features[f],
            path: `/${f}`,
            icon: featureIcons[f]
        }))
    }),
    {}
);
