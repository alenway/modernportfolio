/**
 * MOON LANDING PRELOADER
 * Complete animation sequence with progress tracking
 */

// Initialize the preloader
document.addEventListener("DOMContentLoaded", () => {
    // Create starfield background
    createStars();

    // Start the loading simulation
    simulateLoading();

    // Add loading class to body
    document.body.classList.add("loading");
});

// Generate twinkling stars
function createStars() {
    const starsContainer = document.getElementById("stars");
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.className = "star";

        // Random star sizes (1-4px)
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Random positions
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;

        // Varied animation timing
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 2}s`;

        // Slightly varied opacity
        star.style.opacity = Math.random() * 0.8 + 0.2;

        starsContainer.appendChild(star);
    }
}

// Main loading simulation with progress
function simulateLoading() {
    const elements = {
        progressBar: document.getElementById("progressBar"),
        loadingScreen: document.getElementById("loading-screen"),
        loadingContainer: document.getElementById("loadingContainer"),
        websiteContent: document.getElementById("websiteContent"),
        astronaut: document.querySelector(".astronaut"),
        loadingText: document.querySelector(".loading-text div"),
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

    // Update loading message
    const updateMessage = () => {
        if (messageIndex < messages.length - 1) {
            elements.loadingText.textContent = messages[messageIndex];
            messageIndex++;
        }
    };

    // Loading interval
    const loadingInterval = setInterval(() => {
        if (isComplete) return;

        // Dynamic progress increment (slows as it progresses)
        const increment =
            Math.random() * (progress < 30 ? 15 : progress < 70 ? 10 : 5) + 2;

        progress = Math.min(progress + increment, 100);
        elements.progressBar.style.width = `${progress}%`;

        // Update messages at progress milestones
        if (
            progress >= 25 * messageIndex &&
            messageIndex < messages.length - 1
        ) {
            updateMessage();
        }

        // Complete the loading
        if (progress >= 100) {
            completeLoading();
        }
    }, 200);

    // Handle loading completion
    const completeLoading = () => {
        isComplete = true;
        clearInterval(loadingInterval);

        // Show final message
        elements.loadingText.textContent = messages[messages.length - 1];

        // Trigger landing animation
        setTimeout(() => {
            elements.loadingContainer.classList.add("loading-complete");

            // Show astronaut and landed rocket
            elements.astronaut.style.opacity = "1";
            elements.astronaut.style.transform = "translateY(0)";

            document.querySelector(".landed-rocket").style.opacity = "1";
            document.querySelector(".landed-rocket").style.transform =
                "rotate(0deg)";

            // Prepare to hide loading screen
            setTimeout(transitionToContent, 2000);
        }, 500);
    };

    // Transition to main content
    const transitionToContent = () => {
        // Fade out loading screen
        elements.loadingScreen.style.opacity = "0";
        elements.loadingScreen.style.pointerEvents = "none";

        // Remove loading class from body
        document.body.classList.remove("loading");

        // Show main content
        elements.websiteContent.style.display = "block";
        document.body.style.overflow = "auto"; // Enable scrolling

        // Add stars to main content
        addStarsToWebsite();

        // Setup interactive elements
        setupExploreButton();

        // Remove loading screen after fade completes
        setTimeout(() => {
            elements.loadingScreen.style.display = "none";
        }, 1000);
    };
}

// Add stars to main website content
function addStarsToWebsite() {
    const websiteContent = document.getElementById("websiteContent");
    const bgStars = document.createElement("div");
    bgStars.className = "stars";
    websiteContent.prepend(bgStars);

    // Create fewer stars for performance
    for (let i = 0; i < 80; i++) {
        const star = document.createElement("div");
        star.className = "star";

        // Smaller, more subtle stars
        star.style.width = "2px";
        star.style.height = "2px";
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.opacity = Math.random() * 0.6 + 0.2;

        bgStars.appendChild(star);
    }
}

// Setup explore button interaction
function setupExploreButton() {
    const exploreBtn = document.getElementById("exploreBtn");

    if (exploreBtn) {
        exploreBtn.addEventListener("click", () => {
            // Visual feedback on click
            exploreBtn.textContent = "🌟 Ready for adventure!";
            exploreBtn.style.background =
                "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)";

            // Reset after animation
            setTimeout(() => {
                exploreBtn.textContent = "🌟 Explore the Cosmos";
                exploreBtn.style.background =
                    "linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%)";
            }, 2000);
        });

        // Add hover effect
        exploreBtn.addEventListener("mouseenter", () => {
            exploreBtn.style.transform = "translateY(-2px)";
            exploreBtn.style.boxShadow = "0 6px 20px rgba(57, 190, 255, 0.6)";
        });

        exploreBtn.addEventListener("mouseleave", () => {
            exploreBtn.style.transform = "translateY(0)";
            exploreBtn.style.boxShadow = "0 4px 15px rgba(57, 190, 255, 0.4)";
        });
    }
}
