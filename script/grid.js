const carouselData = [
    {
        image: "../images/purple.jpg",
        title: "HTML, CSS, JavaScript, Axios",
        description: "HTML, CSS, Vanilla JS, Axios, MealDB API",
        info: "FlavorCraft",
        maindata:
            "A responsive food recipe website that allows users to search and discover a wide variety of meals using the MealDB API. Features include search suggestions, dynamic data rendering, and future plans for an AI voice assistant for hands-free cooking.",
    },
    {
        image: "../images/moon.jpg",
        title: "React, Tailwind CSS",
        description: "React, Tailwind CSS, Local Storage",
        info: "TaskZen",
        maindata:
            "A minimalist task manager that helps users create, organize, and track tasks efficiently. Built with React and Tailwind, TaskZen uses local storage for persistence and features light/dark mode support.",
    },
    {
        image: "../images/silhouette.jpg",
        title: "HTML, CSS, JavaScript",
        description: "HTML, CSS Grid/Flexbox, JavaScript",
        info: "Personal Portfolio",
        maindata:
            "A personal portfolio website built to showcase my projects, skills, and contact information. Designed with a responsive grid layout, interactive carousels, and smooth animations for a sleek user experience.",
    },
    {
        image: "../images/trees.jpg",
        title: "MERN Stack, Socket.io",
        description: "MongoDB, Express, React, Node, Socket.io",
        info: "ChatSync",
        maindata:
            "A real-time chat application enabling users to communicate instantly in private or group conversations. Includes user authentication, message persistence, and typing indicators using Socket.io.",
    },
];

let currentIndex = 0;

function updateCarousel() {
    const carousel = document.getElementById("carousel");
    const title = document.getElementById("carousel-title");
    const description = document.getElementById("carousel-description");
    const info = document.getElementById("carousel-info");
    const slideIndicator = document.getElementById("slide-indicator");
    const mainDataElement = document.getElementById("maindata");
    const {
        image,
        title: newTitle,
        description: newDesc,
        info: newInfo,
        maindata: mainDataText,
    } = carouselData[currentIndex];

    // Trigger fade animation
    carousel.classList.remove("fade");
    void carousel.offsetWidth; // Force reflow to restart animation
    carousel.classList.add("fade");

    // Update content
    carousel.style.setProperty("--carousel-image", `url('${image}')`);
    title.textContent = newTitle;
    description.textContent = newDesc;
    info.textContent = newInfo;
    mainDataElement.textContent = mainDataText;
    slideIndicator.innerHTML = `
  <span class="slide-current">0${currentIndex + 1}</span>
  <span class="slide-total">/0${carouselData.length}</span>
`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex =
        (currentIndex - 1 + carouselData.length) % carouselData.length;
    updateCarousel();
}

window.addEventListener("DOMContentLoaded", updateCarousel);
