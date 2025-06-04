// Theme Configuration
const themeConfig = {
    elements: {
        dropdownToggle: document.getElementById("dropdownToggle"),
        dropdownMenu: document.getElementById("themeMenu"),
        themeItems: document.querySelectorAll(".theme-item"),
        textElement: document.querySelector(".typing-text"),
        typingContainer: document.querySelector(".typing-container"),
        loader: document.querySelector(".loader"),
        mainContent: document.querySelector(".container"),
    },
    themes: [
        "theme-dark",
        "theme-light",
        "theme-purple",
        "theme-solarized",
        "theme-ocean",
        "theme-catppuccin",
        "theme-evergreen",
        "theme-aurora",
        "theme-vintage",
    ],
    themeNames: {
        system: "System",
        "theme-dark": "Dark",
        "theme-light": "Light",
        "theme-purple": "Purple",
        "theme-solarized": "Solarized",
        "theme-ocean": "Ocean",
        "theme-catppuccin": "Catppuccin",
        "theme-evergreen": "Evergreen",
        "theme-aurora": "Aurora",
        "theme-vintage": "Vintage",
    },
};

// Theme Manager
const themeManager = {
    applyTheme(theme) {
        const body = document.body;
        body.classList.remove(...themeConfig.themes);

        if (theme === "system") {
            this.applySystemTheme();
        } else {
            body.classList.add(theme);
        }

        this.updateDropdownText(theme);
        localStorage.setItem("selectedTheme", theme);
    },

    applySystemTheme() {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
            .matches
            ? "theme-dark"
            : "theme-light";
        document.body.classList.add(systemTheme);
    },

    updateDropdownText(theme) {
        const name = themeConfig.themeNames[theme] || "Select Theme";
        themeConfig.elements.dropdownToggle.innerHTML = `${name} <i class="arrow"></i>`;
    },

    updateAriaExpanded(isOpen) {
        themeConfig.elements.dropdownToggle.setAttribute(
            "aria-expanded",
            isOpen
        );
    },

    toggleMenu() {
        const dropdown =
            themeConfig.elements.dropdownToggle.closest(".dropdown");
        const isOpen =
            themeConfig.elements.dropdownMenu.classList.toggle("show");
        dropdown.classList.toggle("open", isOpen);
        this.updateAriaExpanded(isOpen);
    },

    closeMenu() {
        const dropdown =
            themeConfig.elements.dropdownToggle.closest(".dropdown");
        themeConfig.elements.dropdownMenu.classList.remove("show");
        dropdown.classList.remove("open");
        this.updateAriaExpanded(false);
    },

    setupEventListeners() {
        themeConfig.elements.dropdownToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        themeConfig.elements.themeItems.forEach((item) => {
            item.addEventListener("click", () => {
                const theme = item.dataset.theme;
                this.applyTheme(theme);
                this.closeMenu();
            });
        });

        document.addEventListener("click", () => {
            this.closeMenu();
        });

        themeConfig.elements.dropdownMenu.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent closing when clicking inside
        });

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", () => {
                if (localStorage.getItem("selectedTheme") === "system") {
                    this.applySystemTheme();
                }
            });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                this.closeMenu();
            }
        });
    },

    initTheme() {
        const savedTheme = localStorage.getItem("selectedTheme") || "system";
        this.applyTheme(savedTheme);
    },
};

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    themeManager.initTheme();
    themeManager.setupEventListeners();
});

// Service Worker Registration
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((reg) => console.log("Service Worker registered!", reg))
            .catch((err) => console.error("Service Worker failed:", err));
    });
}
