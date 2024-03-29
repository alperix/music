import React, { useState } from "react";
import { Link } from "react-router-dom";

import text from "../core/resources/Texts.json";

import { useCatchEvent } from "@/core/services/events/CustomEvents";
import { modules } from "../core/domain/Routes";
import { Icon } from "../atoms/Icon";

import { AppLinks } from "./AppRoutes";


export const Header = () => {
    const [module, setModule] = useState("");
    const [open, setOpen] = useState(false);

    useCatchEvent("toggle-burger", setOpen); 

    useCatchEvent("module-changed", (m: string) => {
        const path = modules[m];
        setModule(path);
        document.title = `${text.App.shortTitle}/${path}`;
    });   

    return (
        <>
            <header className="header">
                <div className="app-title">
                    <button className="burger" onClick={() => setOpen(!open)}>
                        <Icon icon="music_note" />
                    </button>
                    <div className="links" onClick={() => setOpen(false)}>
                        <Link to="/">
                            <div className="f500 text-2xl">{text.App.title}</div>
                        </Link>
                        {module && <div className="module-name">{module}</div>}
                    </div>
                </div>
            </header>

            {/* BURGER-MENU */}
            <nav
                className={`burger-nav ${open ? "open" : ""}`}
                onClick={() => setOpen(false)}
            >
                <AppLinks />
            </nav>
        </>
    );
};
