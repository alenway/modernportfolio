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
