/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./**/*.html"],
    theme: {
        container: {
            center: true,
            padding: "15px",
        },
        extend: {
            colors: {
                main: "var(--color-main)",
                bkg: "var(--color-bkg)",
                colored: "#4880ff",
            },
            screens: {
                xs: "400px",
                xxs: "300px",
            },
        },
    },
    darkMode: ["class", '[data-theme="dark"]'],
    plugins: [],
};
