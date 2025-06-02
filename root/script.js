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

// Project data with real image URLs
const projects = {
    1: {
        title: "E-commerce Platform",
        tags: ["React", "Node.js", "MongoDB"],
        description:
            "A full-featured e-commerce platform built with modern technologies. Includes product catalog, shopping cart, user authentication, and Stripe payment integration. The admin dashboard allows for inventory management and order processing.",
        features: [
            "Responsive product catalog with filters",
            "User authentication (JWT)",
            "Stripe payment processing",
            "Admin dashboard",
            "Product reviews and ratings",
        ],
        images: [
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        ],
        codeLink: "#",
        demoLink: "#",
    },
    2: {
        title: "Task Manager",
        tags: ["Vue.js", "Firebase"],
        description:
            "A collaborative task management application with real-time updates and drag-and-drop interface. Built with Vue.js for the frontend and Firebase for backend services including authentication and database.",
        features: [
            "Real-time task updates",
            "Drag-and-drop interface",
            "User authentication",
            "Team collaboration",
            "Task categories and labels",
        ],
        images: [
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        ],
        codeLink: "#",
        demoLink: "#",
    },
    3: {
        title: "CMS System",
        tags: ["Django", "PostgreSQL"],
        description:
            "A customizable content management system with rich text editing, user roles, and media management. Built with Django for the backend and PostgreSQL for data storage.",
        features: [
            "Rich text editor",
            "User role management",
            "Media library",
            "Custom content types",
            "SEO optimization tools",
        ],
        images: [
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
        ],
        codeLink: "#",
        demoLink: "#",
    },
};

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("projectModal");
    const modalTitle = modal.querySelector(".modal-title");
    const modalTags = modal.querySelector(".modal-tags");
    const modalDescription = modal.querySelector("#projectDescription");
    const modalFeatures = modal.querySelector("#projectFeatures");
    const mainImage = modal.querySelector("#mainImage");
    const thumbnailContainer = modal.querySelector(".thumbnail-container");
    const codeLink = modal.querySelector("#codeLink");
    const demoLink = modal.querySelector("#demoLink");

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        card.addEventListener("click", function () {
            const projectId = this.getAttribute("data-project");
            const project = projects[projectId];

            // Set project info
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;

            // Set tags
            modalTags.innerHTML = "";
            project.tags.forEach((tag) => {
                const tagElement = document.createElement("span");
                tagElement.className = "tag";
                tagElement.textContent = tag;
                modalTags.appendChild(tagElement);
            });

            // Set features
            modalFeatures.innerHTML = "";
            project.features.forEach((feature) => {
                const li = document.createElement("li");
                li.textContent = feature;
                modalFeatures.appendChild(li);
            });

            // Set main image
            mainImage.src = project.images[0];
            mainImage.alt = project.title;

            // Create thumbnails
            thumbnailContainer.innerHTML = "";
            project.images.forEach((image, index) => {
                const thumbnail = document.createElement("div");
                thumbnail.className =
                    "thumbnail" + (index === 0 ? " active" : "");
                thumbnail.innerHTML = `<img src="${image}" alt="${
                    project.title
                } Thumbnail ${index + 1}">`;

                thumbnail.addEventListener("click", () => {
                    // Update main image
                    mainImage.src = image;
                    mainImage.alt = `${project.title} Image ${index + 1}`;

                    // Update active thumbnail
                    thumbnailContainer
                        .querySelectorAll(".thumbnail")
                        .forEach((t) => {
                            t.classList.remove("active");
                        });
                    thumbnail.classList.add("active");
                });

                thumbnailContainer.appendChild(thumbnail);
            });

            // Set links
            codeLink.href = project.codeLink;
            demoLink.href = project.demoLink;

            // Show modal
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    // Close modal
    modal.querySelector(".close-modal").addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
});
