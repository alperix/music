import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import eslintPlugin from "@nabla/vite-plugin-eslint";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import postcssImport from "postcss-import";

const configuration = ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

    const build = {
        outDir: resolve("dist"),
        assetsDir: "assets",
        emptyOutDir: true
    };

    const define = {
        "process.env": process.env,
        "process.env.NODE_ENV": `"${mode}"`
    };

    let plugins = [react()];

    if (mode === "development") {
        const options = {
            eslintOptions: { cache: false },
            formatter: "stylish"
        };
        plugins = [react(), eslintPlugin(options)];
    }

    let config = {
        build: build,
        base: process.env.VITE_PUBLIC_URL,
        server: { port: 3000 },
        define: define,
        plugins: plugins,
        resolve: {
            alias: {
                "@": resolve(__dirname, "./src"),
            }
        },
        css: {
            postcss: {
                plugins: [postcssImport(), tailwindcss(), autoprefixer()]
            },
            devSourcemap: true
        }
    };

    return defineConfig(config);
};

// https://vitejs.dev/config/
export default configuration;
