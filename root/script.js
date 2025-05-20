const dropdownToggle = document.getElementById("dropdownToggle");
const dropdownMenu = document.getElementById("themeMenu");
const themeItems = document.querySelectorAll(".theme-item");
const themes = [
    "theme-dark",
    "theme-light",
    "theme-purple",
    "theme-solarized",
    "theme-ocean",
    "theme-catppuccin",
];

function applyTheme(theme) {
    themes.forEach((t) => document.body.classList.remove(t));

    if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "theme-dark"
            : "theme-light";
        document.body.classList.add(systemTheme);
    } else {
        document.body.classList.add(theme);
    }

    // Update dropdown text to show selected theme
    const selectedThemeName =
        theme === "system"
            ? "System"
            : theme === "theme-dark"
            ? "Dark"
            : theme === "theme-light"
            ? "Light"
            : theme === "theme-purple"
            ? "Purple"
            : theme === "theme-solarized"
            ? "Solarized"
            : theme === "theme-catppuccin"
            ? "Catppuccin"
            : theme === "theme-ocean"
            ? "Ocean"
            : "Select Theme";

    dropdownToggle.innerHTML = selectedThemeName + ' <i class="arrow"></i>';
}

function toggleMenu() {
    dropdownMenu.classList.toggle("show");
}

dropdownToggle.addEventListener("click", toggleMenu);

themeItems.forEach((item) => {
    item.addEventListener("click", () => {
        const selectedTheme = item.dataset.theme;
        localStorage.setItem("selectedTheme", selectedTheme);
        applyTheme(selectedTheme);
        dropdownMenu.classList.remove("show");
    });
});

// Set theme on load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("selectedTheme") || "system";
    applyTheme(savedTheme);
});

// Listen to system theme changes if "system" is selected
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
        if (localStorage.getItem("selectedTheme") === "system")
            applyTheme("system");
    });

// Close dropdown when clicking outside
window.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) dropdownMenu.classList.remove("show");
});
