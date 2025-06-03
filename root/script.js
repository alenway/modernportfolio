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
    animation: {
        textToType: "Portfèlio",
        typingSpeed: 100,
        highlightDelay: 800,
        zoomDuration: 1200,
        fadeDuration: 800,
        finalHideDelay: 500,
    },
};

// Theme Management
const themeManager = {
    applyTheme(theme) {
        document.body.classList.remove(...themeConfig.themes);

        if (theme === "system") {
            this.applySystemTheme();
        } else {
            document.body.classList.add(theme);
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
        themeConfig.elements.dropdownToggle.innerHTML = `${
            themeConfig.themeNames[theme] || "Select Theme"
        } <i class="arrow"></i>`;
    },

    initTheme() {
        const savedTheme = localStorage.getItem("selectedTheme") || "system";
        this.applyTheme(savedTheme);
    },

    setupEventListeners() {
        themeConfig.elements.dropdownToggle.addEventListener(
            "click",
            this.toggleMenu
        );

        themeConfig.elements.themeItems.forEach((item) => {
            item.addEventListener("click", () => {
                this.applyTheme(item.dataset.theme);
                themeConfig.elements.dropdownMenu.classList.remove("show");
            });
        });

        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", () => {
                if (localStorage.getItem("selectedTheme") === "system") {
                    this.applySystemTheme();
                }
            });

        window.addEventListener("click", (e) => {
            if (!e.target.closest(".dropdown")) {
                themeConfig.elements.dropdownMenu.classList.remove("show");
            }
        });
    },

    toggleMenu() {
        themeConfig.elements.dropdownMenu.classList.toggle("show");
    },
};
