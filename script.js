document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");

    mobileMenuButton.addEventListener("click", function () {
        mobileMenu.classList.toggle("hidden");
    });

    // Theme switcher
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const htmlElement = document.documentElement;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme =
        localStorage.getItem("theme") ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "theme-dark"
            : "theme-light");

    htmlElement.classList.add(savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener("click", function () {
        if (htmlElement.classList.contains("theme-light")) {
            htmlElement.classList.remove("theme-light");
            htmlElement.classList.add("theme-dark");
            localStorage.setItem("theme", "theme-dark");
            updateThemeIcon("theme-dark");
        } else {
            htmlElement.classList.remove("theme-dark");
            htmlElement.classList.add("theme-light");
            localStorage.setItem("theme", "theme-light");
            updateThemeIcon("theme-light");
        }
    });

    function updateThemeIcon(theme) {
        if (theme === "theme-dark") {
            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");
        } else {
            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");
        }
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll("#mobile-menu a");
    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            mobileMenu.classList.add("hidden");
        });
    });
});
