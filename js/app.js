import translations from "./translations.js";

//  Controlling the page's theme

function handleDarkMode(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}

window.handleDarkMode = handleDarkMode;

//  Controlling the Language

const langMenu = document.getElementById("langMenu");
const toggleLangMenu = document.getElementById("toggleLang");

function handleLang() {
    langMenu.classList.toggle("hidden");
}

window.handleLang = handleLang;

// Controling the responsive Menu

const menu = document.querySelector("nav");
const burger = document.getElementById("burger");
const burgerLabel = document.querySelector(".buttons__burger");

function handleMenu() {
    menu.classList.toggle("hide_menu");
}

window.handleMenu = handleMenu;

document.addEventListener("click", (event) => {
    const isClickInsideLang =
        langMenu.contains(event.target) ||
        toggleLangMenu.contains(event.target);

    const isClickInsideMenu =
        menu.contains(event.target) || burgerLabel.contains(event.target);

    if (!isClickInsideLang) {
        langMenu.classList.add("hidden");
    }
    if (!isClickInsideMenu && burger.checked) {
        menu.classList.add("hide_menu");
        burger.checked = false;
    }
});

// Controlling the translation

// const languageSelector = document.querySelector("select");
// languageSelector.addEventListener("change", (event) => {
//     setLanguage(event.target.value);
//     localStorage.setItem("lang", event.target.value);
// });

document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelector("#switch").checked = theme === "dark" ? true : false;
});

const setLanguage = (language) => {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
        const translationKey = element.getAttribute("data-i18n");
        element.textContent = translations[language][translationKey];
    });
    document.dir = language === "ar" ? "rtl" : "ltr";

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("lang", language);
    window.history.replaceState(null, "", currentUrl);
    localStorage.setItem("lang", language);
    styleSelectedLanguage(language);
};

window.setLanguage = setLanguage;

function getLanguageFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("lang") || localStorage.getItem("lang") || "en";
}

window.addEventListener("load", function () {
    const currentLanguage = getLanguageFromURL();
    setLanguage(currentLanguage);
});

function styleSelectedLanguage(lang) {
    Array.from(langMenu.children).forEach((btn) => {
        if (btn.getAttribute("data-lg") === lang) {
            btn.classList.add("bg-bkg");
        } else {
            btn.classList.remove("bg-bkg");
        }
    });
}
