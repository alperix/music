export const isDev = window.location.hostname === "localhost";
export const api = process.env.VITE_API_URL || "/api";
export const timeout = 10; // seconds;
export const pageSize = 20;