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

document.addEventListener("DOMContentLoaded", () => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.querySelector("#switch").checked = theme === "dark" ? true : false;
});

//  Controlling the Language Menu

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
    menu.nextElementSibling.classList.toggle("hidden");
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
        menu.nextElementSibling.classList.add("hidden");
    }
});

// Controlling the translation

const setLanguage = (language) => {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((element) => {
        const translationKey = element.getAttribute("data-i18n");
        element.innerHTML = translations[language][translationKey];
    });
    document.dir = language === "ar" ? "rtl" : "ltr";

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("lang", language);
    window.history.replaceState(null, "", currentUrl);
    localStorage.setItem("lang", language);
    styleSelectedLanguage(language);
    langMenu.classList.add("hidden");
    updateTypedText(translations[language]["job"]);
};

window.setLanguage = setLanguage;

function getLanguageFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("lang") || localStorage.getItem("lang") || "en";
}

function styleSelectedLanguage(lang) {
    Array.from(langMenu.children).forEach((btn) => {
        if (btn.getAttribute("data-lg") === lang) {
            btn.classList.add("bg-indigo-100", "text-black");
        } else {
            btn.classList.remove("bg-indigo-100", "text-black");
        }
    });
}
window.addEventListener("load", function () {
    const currentLanguage = getLanguageFromURL();
    setLanguage(currentLanguage);
});

// Controling the active links

let sections = document.querySelectorAll("section");
let links = document.querySelectorAll("ul a");

window.addEventListener("scroll", () => {
    sections.forEach((sec) => {
        let scroly = window.scrollY;
        let top = sec.offsetTop;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");
        if (scroly >= top && scroly < top + height) {
            links.forEach((link) => {
                link.classList.remove("text-indigo-500");
            });
            if (id !== null) {
                document
                    .querySelectorAll("ul a[href*=" + id + "]")
                    .forEach((e) => {
                        e.classList.add("text-indigo-500");
                    });
            }
        }
    });
});

AOS.init();

let typed;

function updateTypedText(text) {
    if (typed) {
        typed.destroy();
    }

    typed = new Typed("#job", {
        strings: [text],
        typeSpeed: 100,
        backSpeed: 25,
        startDelay: 400,
        backDelay: 1200,
        loop: true,
    });
}
