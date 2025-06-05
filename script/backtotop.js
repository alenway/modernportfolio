const rocketBtn = document.getElementById("rocketBtn");
let isScrolling = false;
let scrollTimeout;

function toggleRocketButton() {
    if (window.pageYOffset > 300) {
        rocketBtn.classList.add("show");
    } else {
        rocketBtn.classList.remove("show");
    }
}

function scrollToTop() {
    if (isScrolling) return;
    isScrolling = true;

    rocketBtn.classList.add("launching");
    rocketBtn.classList.remove("show");

    // Scroll to top after animation starts
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);

    // Reset after animation completes
    setTimeout(() => {
        rocketBtn.classList.remove("launching");
        isScrolling = false;
        toggleRocketButton(); // Check visibility again
    }, 1000);
}

function handleScroll() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (!isScrolling) toggleRocketButton();
    }, 100);
}

window.addEventListener("scroll", handleScroll);
rocketBtn.addEventListener("click", scrollToTop);

// Initial check
toggleRocketButton();
