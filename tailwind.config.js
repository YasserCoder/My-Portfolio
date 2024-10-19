/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./*.html"],
    theme: {
        container: {
            center: true,
            padding: "15px",
        },
        extend: {
            fontFamily: {
                body: ["Nunito Sans"],
            },
            colors: {
                main: "var(--color-main)",
                bkg: "var(--color-bkg)",
                secondary: "var(--color-secondary-bkg)",
                content: "var(--color-content)",
                colored: "#FF9D29",
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
