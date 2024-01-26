import React, { useState } from "react";
import { Link } from "react-router-dom";

import { route } from "../core/domain/Modules";
import { de } from "../core/resources/de";
import { Icon } from "../atoms/Icon";
import { AppRoutes, AppLinks } from "./Routes";


export const App = () => {
    const [open, setOpen] = useState(false);
    const [module, setModule] = useState("");

    return (
        <main>
            {/* HEADER */}
            <header className="header">
                <div className="app-title">
                    <button className="burger" onClick={() => setOpen(!open)}>
                        <Icon icon="music_note" />
                    </button>
                    <div className="links">
                        <Link to="/" onClick={() => setOpen(false)}>
                            <div className={`f500 text-2xl`}>{de.title}</div>
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
                <AppLinks onClick={(r: route) => setModule(r.name)}/>
            </nav>

            {/* CONTENT */}
            <div className="content">
                <nav className="left-nav">
                    <AppLinks onClick={(r: route) => setModule(r.name)}/>
                </nav>
                <div className="app-content" onClick={() => setOpen(false)}>
                    <AppRoutes />
                </div>
            </div>

            {/* FOOTER */}
            <div className="footer">
                <span>
                    &copy;2023, {de.title} Version: 0.0.0.0
                </span>
            </div>
        </main>
    );
};
