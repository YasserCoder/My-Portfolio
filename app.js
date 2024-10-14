//  Controlling the page's theme

const theme = localStorage.getItem("theme") || "light";

document.documentElement.setAttribute("data-theme", theme);

document
    .querySelector("#switch")
    .setAttribute("checked", theme === "dark" ? "true" : "false");

function handleDarkMode(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}

//  Controlling the Language

const langMenu = document.getElementById("langMenu");
const toggleLangMenu = document.getElementById("toggleLang");

function handleLang() {
    langMenu.classList.toggle("hidden");
}

// document.documentElement.nextElementSibling.classList.toggle('hidden')

// Controling the responsive Menu

const menu = document.querySelector("nav");
const burger = document.getElementById("burger");
const burgerLabel = document.querySelector(".buttons__burger");

function handleMenu() {
    menu.classList.toggle("-translate-x-[calc(100%+15px)]");
}

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
        menu.classList.add("-translate-x-[calc(100%+15px)]");
        burger.checked = false;
    }
});
