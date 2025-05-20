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
    ],
    themeNames: {
        system: "System",
        "theme-dark": "Dark",
        "theme-light": "Light",
        "theme-purple": "Purple",
        "theme-solarized": "Solarized",
        "theme-ocean": "Ocean",
        "theme-catppuccin": "Catppuccin",
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

// // tab theme customization

// function applyThemeColor() {
//     const themeColorMeta = document.querySelector("#theme-color-meta");
//     const isDark = document.body.classList.contains("theme-dark");

//     if (isDark) {
//         themeColorMeta.setAttribute("content", "#121212"); // or "#bb86fc" or "#03dac6"
//     } else {
//         themeColorMeta.setAttribute("content", "#ffffff"); // light theme default
//     }
// }

// // Run it once on page load
// applyThemeColor();

// // Run it whenever you switch themes
// document.querySelector("#theme-toggle").addEventListener("click", () => {
//     document.body.classList.toggle("theme-dark");
//     applyThemeColor();
// });

// // for tab icon customization according to theme
// // <link id="favicon" rel="icon" href="favicon-light.png">

// function applyFavicon() {
//     const favicon = document.getElementById("favicon");
//     const isDark = document.body.classList.contains("theme-dark");
//     favicon.href = isDark ? "favicon-dark.png" : "favicon-light.png";
// }

// Preloader Animation
const preloader = {
    init() {
        if (!this.checkElements()) return;

        this.prepareDOM();
        this.startTypingAnimation();
    },

    checkElements() {
        return Object.values(themeConfig.elements).every((el) => el !== null);
    },

    prepareDOM() {
        themeConfig.elements.mainContent.style.display = "none";
        document.body.style.overflow = "hidden";
    },

    startTypingAnimation() {
        let charIndex = 0;

        const typeText = () => {
            if (charIndex < themeConfig.animation.textToType.length) {
                themeConfig.elements.textElement.textContent +=
                    themeConfig.animation.textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, themeConfig.animation.typingSpeed);
            } else {
                this.highlightText();
                setTimeout(
                    () => this.startZoomTransition(),
                    themeConfig.animation.highlightDelay
                );
            }
        };

        setTimeout(typeText, 500);
    },

    highlightText() {
        themeConfig.elements.textElement.innerHTML =
            themeConfig.elements.textElement.textContent.replace(
                "Portfèlio",
                '<span class="highlight">Portfèlio</span>'
            );
    },

    startZoomTransition() {
        themeConfig.elements.typingContainer.style.transform = "scale(8)";
        themeConfig.elements.typingContainer.style.opacity = "0.6";

        setTimeout(() => {
            themeConfig.elements.loader.style.opacity = "0";
            setTimeout(
                () => this.showMainContent(),
                themeConfig.animation.fadeDuration
            );
        }, themeConfig.animation.zoomDuration);
    },

    showMainContent() {
        themeConfig.elements.mainContent.style.display = "block";
        document.body.style.overflow = "";

        setTimeout(() => {
            themeConfig.elements.loader.style.display = "none";
        }, themeConfig.animation.finalHideDelay);
    },
};

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    themeManager.initTheme();
    themeManager.setupEventListeners();
    preloader.init();
});

// manifest json
// In script.js
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then((reg) => console.log("Service Worker registered!", reg))
            .catch((err) => console.error("Service Worker failed:", err));
    });
}
