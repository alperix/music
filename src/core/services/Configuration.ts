export const isDev = window.location.hostname === "localhost";
export const api = process.env.VITE_API_URL || "/api";