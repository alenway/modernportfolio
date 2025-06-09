// const carouselData = [
//     {
//         image: "../images/purple.jpg",
//         title: "HTML, CSS, JavaScript, Axios",
//         description: "HTML, CSS, Vanilla JS, Axios, MealDB API",
//         info: "FlavorCraft",
//         maindata:
//             "A responsive food recipe website that allows users to search and discover a wide variety of meals using the MealDB API. Features include search suggestions, dynamic data rendering, and future plans for an AI voice assistant for hands-free cooking.",
//     },
//     {
//         image: "../images/moon.jpg",
//         title: "React, Tailwind CSS",
//         description: "React, Tailwind CSS, Local Storage",
//         info: "TaskZen",
//         maindata:
//             "A minimalist task manager that helps users create, organize, and track tasks efficiently. Built with React and Tailwind, TaskZen uses local storage for persistence and features light/dark mode support.",
//     },
//     {
//         image: "../images/silhouette.jpg",
//         title: "HTML, CSS, JavaScript",
//         description: "HTML, CSS Grid/Flexbox, JavaScript",
//         info: "Personal Portfolio",
//         maindata:
//             "A personal portfolio website built to showcase my projects, skills, and contact information. Designed with a responsive grid layout, interactive carousels, and smooth animations for a sleek user experience.",
//     },
//     {
//         image: "../images/trees.jpg",
//         title: "MERN Stack, Socket.io",
//         description: "MongoDB, Express, React, Node, Socket.io",
//         info: "ChatSync",
//         maindata:
//             "A real-time chat application enabling users to communicate instantly in private or group conversations. Includes user authentication, message persistence, and typing indicators using Socket.io.",
//     },
// ];

// let currentIndex = 0;

// function updateCarousel() {
//     const carousel = document.getElementById("carousel");
//     const title = document.getElementById("carousel-title");
//     const description = document.getElementById("carousel-description");
//     const info = document.getElementById("carousel-info");
//     const slideIndicator = document.getElementById("slide-indicator");
//     const mainDataElement = document.getElementById("maindata");
//     const {
//         image,
//         title: newTitle,
//         description: newDesc,
//         info: newInfo,
//         maindata: mainDataText,
//     } = carouselData[currentIndex];

//     // Trigger fade animation
//     carousel.classList.remove("fade");
//     void carousel.offsetWidth; // Force reflow to restart animation
//     carousel.classList.add("fade");

//     // Update content
//     carousel.style.setProperty("--carousel-image", `url('${image}')`);
//     title.textContent = newTitle;
//     description.textContent = newDesc;
//     info.textContent = newInfo;
//     mainDataElement.textContent = mainDataText;
//     slideIndicator.innerHTML = `
//   <span class="slide-current">0${currentIndex + 1}</span>
//   <span class="slide-total">/0${carouselData.length}</span>
// `;
// }

// function nextSlide() {
//     currentIndex = (currentIndex + 1) % carouselData.length;
//     updateCarousel();
// }

// function prevSlide() {
//     currentIndex =
//         (currentIndex - 1 + carouselData.length) % carouselData.length;
//     updateCarousel();
// }

// window.addEventListener("DOMContentLoaded", updateCarousel);

// hero title dynamic sentance
const words = ["inspire", "convert", "engage", "perform"];

let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 120;
let deletingSpeed = 60;
let pauseAfterWord = 1800;
let pauseAfterDelete = 400;

const typingTextElement = document.getElementById("typingText");

function typeEffect() {
    const currentWord = words[currentWordIndex];

    if (isDeleting) {
        // Delete character by character
        currentCharIndex--;
        typingTextElement.textContent = currentWord.substring(
            0,
            currentCharIndex
        );

        // Check if completely deleted
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            setTimeout(typeEffect, pauseAfterDelete);
            return;
        }

        setTimeout(typeEffect, deletingSpeed);
    } else {
        // Type character by character
        typingTextElement.textContent = currentWord.substring(
            0,
            currentCharIndex + 1
        );
        currentCharIndex++;

        // Check if word is complete
        if (currentCharIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseAfterWord);
            return;
        }

        setTimeout(typeEffect, typingSpeed);
    }
}

// Start the typing effect
typeEffect();

// hero section copy email functionality
function copyEmail(event) {
    const emailText = document.getElementById("emailText").textContent;
    const feedback = document.getElementById("copyFeedback");
    const container = event.currentTarget;

    // Create ripple effect
    createRipple(event, container);

    // Copy to clipboard
    navigator.clipboard
        .writeText(emailText)
        .then(() => {
            // Show feedback
            feedback.classList.add("show");

            // Hide feedback after 2 seconds
            setTimeout(() => {
                feedback.classList.remove("show");
            }, 2000);
        })
        .catch((err) => {
            console.error("Failed to copy email: ", err);
            // Fallback for older browsers
            fallbackCopyTextToClipboard(emailText);
        });
}

function createRipple(event, element) {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    element.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand("copy");
        const feedback = document.getElementById("copyFeedback");
        feedback.classList.add("show");
        setTimeout(() => {
            feedback.classList.remove("show");
        }, 2000);
    } catch (err) {
        console.error("Fallback: Could not copy text: ", err);
    }

    document.body.removeChild(textArea);
}

const card = document.querySelector(".lava-card");
const blobs = document.querySelectorAll(".blob");
let isHovering = false;

// Initial positions for smooth return
const initialPositions = [
    { top: 20, left: 10 },
    { top: 50, left: 60 },
    { top: 70, left: 30 },
];

// Animation frame for smooth movement (hover and return)
function animateBlobs() {
    if (!isHovering && !blobs[0].classList.contains("returning")) return;

    let allBlobsReturned = true;

    blobs.forEach((blob, index) => {
        const currentX = parseFloat(
            blob.style.left || initialPositions[index].left
        );
        const currentY = parseFloat(
            blob.style.top || initialPositions[index].top
        );

        if (isHovering) {
            // Mouse-following logic
            const mouseX = parseFloat(
                card.dataset.mouseX || initialPositions[index].left
            );
            const mouseY = parseFloat(
                card.dataset.mouseY || initialPositions[index].top
            );
            const time = Date.now() * 0.001;
            const offsetX = Math.sin(time + index) * 5; // Playful wobble
            const offsetY = Math.cos(time + index) * 5;
            const targetX = mouseX + (index * 20 - 20) + offsetX;
            const targetY = mouseY + (index * 20 - 20) + offsetY;

            const lerp = (start, end, factor) => start + (end - start) * factor;
            const newX = lerp(currentX, targetX, 0.15);
            const newY = lerp(currentY, targetY, 0.15);

            blob.style.left = `${newX}%`;
            blob.style.top = `${newY}%`;
        } else {
            // Return to initial positions
            const targetX = initialPositions[index].left;
            const targetY = initialPositions[index].top;

            const lerp = (start, end, factor) => start + (end - start) * factor;
            const newX = lerp(currentX, targetX, 0.15); // Consistent lerp factor
            const newY = lerp(currentY, targetY, 0.15);

            blob.style.left = `${newX}%`;
            blob.style.top = `${newY}%`;

            // Tighter threshold for stopping return animation
            if (
                Math.abs(newX - targetX) > 0.5 ||
                Math.abs(newY - targetY) > 0.5
            ) {
                allBlobsReturned = false;
            }
        }
    });

    // Stop return animation when all blobs are close to initial positions
    if (!isHovering && allBlobsReturned) {
        blobs.forEach((blob) => blob.classList.remove("returning"));
    } else {
        requestAnimationFrame(animateBlobs);
    }
}

card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    card.dataset.mouseX = (
        ((e.clientX - rect.left) / rect.width) *
        100
    ).toString();
    card.dataset.mouseY = (
        ((e.clientY - rect.top) / rect.height) *
        100
    ).toString();

    if (!isHovering) {
        isHovering = true;
        blobs.forEach((blob) => blob.classList.remove("returning"));
        animateBlobs();
    }
});

card.addEventListener("mouseleave", () => {
    isHovering = false;
    blobs.forEach((blob) => blob.classList.add("returning"));
    animateBlobs();
});
