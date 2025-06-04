/**
 * MOON LANDING PRELOADER
 * Complete animation sequence with progress tracking
 */

// On DOM ready
document.addEventListener("DOMContentLoaded", () => {
    createStars(); // Generate starfield
    simulateLoading(); // Start simulated loading
    document.body.classList.add("loading");
});

// Generate starfield in the background
function createStars() {
    const starsContainer = document.getElementById("stars");
    if (!starsContainer) return;

    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star";

        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 2}s`;
        star.style.opacity = Math.random() * 0.8 + 0.2;

        starsContainer.appendChild(star);
    }
}

// Simulated loading bar and animations
function simulateLoading() {
    const elements = {
        progressBar: document.getElementById("progressBar"),
        loadingScreen: document.getElementById("loading-screen"),
        loadingContainer: document.getElementById("loadingContainer"),
        websiteContent: document.getElementById("websiteContent"),
        astronaut: document.querySelector(".astronaut"),
        loadingText: document.querySelector(".loading-text div"),
        landedRocket: document.querySelector(".landed-rocket"),
        particlesBg: document.getElementById("particles-bg"),
    };

    const messages = [
        "🚀 Launching into space...",
        "🌌 Navigating through stars...",
        "🌙 Approaching the moon...",
        "🛬 Preparing for landing...",
        "🎉 Landing successful!",
    ];

    let progress = 0;
    let messageIndex = 0;
    let isComplete = false;

    const updateMessage = () => {
        if (elements.loadingText && messageIndex < messages.length - 1) {
            elements.loadingText.textContent = messages[messageIndex++];
        }
    };

    const loadingInterval = setInterval(() => {
        if (isComplete || !elements.progressBar) return;

        const increment =
            Math.random() * (progress < 30 ? 15 : progress < 70 ? 10 : 5) + 2;
        progress = Math.min(progress + increment, 100);
        elements.progressBar.style.width = `${progress}%`;

        if (
            progress >= 25 * messageIndex &&
            messageIndex < messages.length - 1
        ) {
            updateMessage();
        }

        if (progress >= 100) completeLoading();
    }, 200);

    function completeLoading() {
        isComplete = true;
        clearInterval(loadingInterval);

        if (elements.loadingText) {
            elements.loadingText.textContent = messages[messages.length - 1];
        }

        setTimeout(() => {
            elements.loadingContainer?.classList.add("loading-complete");

            if (elements.astronaut) {
                elements.astronaut.style.opacity = "1";
                elements.astronaut.style.transform = "translateY(0)";
            }

            if (elements.landedRocket) {
                elements.landedRocket.style.opacity = "1";
                elements.landedRocket.style.transform = "rotate(0deg)";
            }

            setTimeout(transitionToContent, 2000);
        }, 500);
    }

    function transitionToContent() {
        const { loadingScreen, websiteContent, particlesBg } = elements;

        if (loadingScreen) {
            loadingScreen.style.opacity = "0";
            loadingScreen.style.pointerEvents = "none";
        }

        document.body.classList.remove("loading");
        if (websiteContent) {
            websiteContent.style.display = "block";
        }
        document.body.style.overflow = "auto";

        if (particlesBg) {
            particlesBg.classList.remove("hidden");

            setTimeout(() => {
                particlesBg.classList.add("active");

                if (window.tsParticles) {
                    particlesBg.load("particles-bg", {
                        background: { color: { value: "transparent" } },
                        particles: {
                            number: { value: 50 },
                            color: { value: "#ffffff" },
                            shape: { type: "circle" },
                            opacity: { value: 0.5 },
                            size: { value: 2 },
                            move: { enable: true, speed: 0.6 },
                        },
                    });
                }
            }, 300);
        }

        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 1000);
        }
    }
}

// Add background stars after transition
function addStarsToWebsite() {
    const websiteContent = document.getElementById("websiteContent");
    if (!websiteContent) return;

    const bgStars = document.createElement("div");
    bgStars.className = "stars";
    websiteContent.prepend(bgStars);

    for (let i = 0; i < 80; i++) {
        const star = document.createElement("div");
        star.className = "star";

        star.style.width = "2px";
        star.style.height = "2px";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.opacity = Math.random() * 0.6 + 0.2;

        bgStars.appendChild(star);
    }
}
