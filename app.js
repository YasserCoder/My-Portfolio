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
document.addEventListener("click", (event) => {
    const isClickInside =
        langMenu.contains(event.target) ||
        toggleLangMenu.contains(event.target);

    if (!isClickInside) {
        langMenu.classList.add("hidden"); // Close the menu by adding 'hidden' class
    }
});

// document.documentElement.nextElementSibling.classList.toggle('hidden')
