const carouselData = [
    {
        image: "../images/sakura.jpg",
        title: "Nature View",
        description: "A peaceful view of nature's harmony.",
        info: "Shot in Japan",
    },
    {
        image: "../images/cat1.jpg",
        title: "Nature View",
        description: "A peaceful view of nature's harmony.",
        info: "Shot in Usa",
    },
    {
        image: "../images/cat2.jpg",
        title: "City Lights",
        description: "The vibrant life of a city at night.",
        info: "Shot in India",
    },
    {
        image: "../images/cat3.jpg",
        title: "Sunlit Forest",
        description: "Sunlight filtering through the trees.",
        info: "Taken at sunset",
    },
];

let currentIndex = 0;

function updateCarousel() {
    const carousel = document.getElementById("carousel");
    const title = document.getElementById("carousel-title");
    const description = document.getElementById("carousel-description");
    const info = document.getElementById("carousel-info");
    const slideIndicator = document.getElementById("slide-indicator");

    const {
        image,
        title: newTitle,
        description: newDesc,
        info: newInfo,
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
