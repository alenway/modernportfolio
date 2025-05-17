const storageKey = "theme-preference";

const theme = {
    value:
        localStorage.getItem(storageKey) ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"),
};

const setPreference = () => {
    localStorage.setItem(storageKey, theme.value);
    document.documentElement.setAttribute("data-theme", theme.value);
    document
        .querySelector("#theme-toggle")
        ?.setAttribute("aria-label", theme.value);
};

const toggleTheme = () => {
    theme.value = theme.value === "light" ? "dark" : "light";
    setPreference();
};

// Set initial theme
setPreference();

// Add event listeners
document.querySelector("#theme-toggle").addEventListener("click", toggleTheme);

// Watch for OS color scheme changes
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
        theme.value = e.matches ? "dark" : "light";
        setPreference();
    });
