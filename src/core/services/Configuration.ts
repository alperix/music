export const isDev = window.location.hostname === "localhost";
export const api = process.env.VITE_API_URL || "/api";
export const timeout = 10; // seconds;
export const pageSize = 20;
export const SECRET = "password"

export const FIREBASE = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID
}