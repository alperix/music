import React from "react";

import text from "../core/resources/Texts.json";

export const Footer = () => (
    <footer className="footer">
        <span>&copy;2023, {text.App.title} Version: 0.0.0.0</span>
    </footer>
);
