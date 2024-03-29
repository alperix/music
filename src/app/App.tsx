import React from "react";

import { Header } from "./Header";
import { Footer } from "./Footer";
import { AppContent } from "./AppContent";

export const App = () => (
    <main className="app">
        <Header />
        <AppContent />
        <Footer />
    </main>
);
