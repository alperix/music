type module = 
{
    name: string;
    path: string;
}

export const modules : Record<string, module> = {
    administration: { name: "Administration", path: "/administration" },
    registration: { name: "Anmeldung", path: "/registration" },
    freePlaces: { name: "Freie Plätze", path: "/free-places" },
    teachers: { name: "Lehrer*innen", path: "/teachers" },
    students: { name: "Schüler*innen", path: "/students" },
    representatives: { name: "Vertreter*innen", path: "/representatives" },
    teachingFees: { name: "Unterrichtsgebühren", path: "/teaching-fees" },
    instruments: { name: "Instrumente", path: "/instruments" },
    discounts: { name: "Ermäßigungen", path: "/discounts" },
}