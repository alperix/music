export type route = {
    name: string;
    path: string;
    icon?: string;
};

export const appRoutes: Record<string, route> = {
    administration: { name: "Administration", path: "/administration" },
    registration: { name: "Anmeldung", path: "/registration" },
    freePlaces: { name: "Freie Plätze", path: "/freePlaces" },
    teachers: { name: "Lehrer*innen", path: "/teachers" },
    students: { name: "Schüler*innen", path: "/students" },
    representatives: { name: "Vertreter*innen", path: "/representatives" },
    teachingFees: { name: "Unterrichtsgebühren", path: "/teachingFees" },
    instruments: { name: "Instrumente", path: "/instruments" },
    discounts: { name: "Ermäßigungen", path: "/discounts" }
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

export const icons: Record<string, string> = {
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

export const feature = (f: string) => ({
    name: features[f],
    path: `/${f}`,
    icon: icons[f]
});

export const moduleRoutes: Record<string, route[]> = {
    administration: [feature("refresh"), feature("reports"), feature("forms")],
    registration: [
        feature("reports"),
        feature("maindata"),
        feature("relocation"),
        feature("mailing")
    ],
    freePlaces: [feature("reports"), feature("subsets")],
    teachers: [feature("reports"), feature("maindata"), feature("mailing")],
    students: [
        feature("refresh"),
        feature("reports"),
        feature("maindata"),
        feature("mailing"),
        feature("labels")
    ],
    representatives: [feature("reports"), feature("maindata")],
    teachingFees: [feature("reports"), feature("invoices"), feature("export")],
    instruments: [feature("reports"), feature("forms"), feature("invoices")],
    discounts: [feature("reports")]
};
