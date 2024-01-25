import React, { useState } from "react";
import { Link } from "react-router-dom";

import { de } from "../core/resources/de";
import { Icon } from "../atoms/Icon";
import { Routes, Links } from "./Routes";

export const App = () => {
    const [open, setOpen] = useState(false);

    return (
        <main>
            {/* HEADER */}
            <header className="header">
                <div className="flex items-center justify-start gap-3">
                    <button className="burger" onClick={() => setOpen(!open)}>
                        <Icon icon="music_note" />
                    </button>
                    <Link to="/" onClick={() => setOpen(false)}>
                        <h1 className="f500">{de.title}</h1>
                    </Link>
                </div>
            </header>

            {/* BURGER-MENU */}
            <nav
                className={`menu ${open ? "open" : ""}`}
                onClick={() => setOpen(false)}
            >
                <Links />
            </nav>

            {/* CONTENT */}
            <div className="content">
                <div className="left">
                    <Links />
                </div>
                <div className="page" onClick={() => setOpen(false)}>
                    <Routes />
                </div>
            </div>

            {/* FOOTER */}
            <div className="footer">
                <p className="text-xs font-bold text-black text-opacity-25">
                    &copy;2023, {de.title} Version: 0.0.0.0
                </p>
            </div>
        </main>
    );
};
