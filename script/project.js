// =======================================
// === *** === *** === *** === *** === *** === *** === *** === *** === *** ===
// Section Project data
const projects = {
    1: {
        title: "Food Recipe App",
        tags: ["React", "API", "Responsive Design"],
        description:
            "A user-friendly app to search and explore various recipes using a third-party meals API. Includes search by ingredients, detailed recipe instructions, and a modern responsive UI.",
        features: [
            "Search recipes by name or ingredient",
            "Recipe details with ingredients and steps",
            "Bookmark favorite recipes",
            "Mobile-responsive layout",
            "API integration (e.g., TheMealDB)",
            "Loading states and error handling",
        ],
        images: ["./images/recipe.png", "./images/recipefinder.webp"],
        codeLink: "https://github.com/yourusername/ecommerce-platform",
        demoLink: "https://ecommerce-demo.vercel.app",
    },
    2: {
        title: "BookNest – Online Bookstore",
        tags: ["Next.js", "Express", "PostgreSQL"],
        status: "Live",
        description:
            "A sleek online bookstore with dynamic categories, Stripe integration, and user reviews.",
        stats: {
            count: "5k+",
            label1: "Books",
            uptime: "99.9%",
            rating: "4.8",
        },
        image: ["./images/book0.jpg", "./images/book1.jpg"],
    },
    3: {
        title: "DevConnect – Developer Social Network",
        tags: ["React", "Node.js", "MongoDB"],
        status: "Live",
        description:
            "A community app for developers to post, like, comment, and connect with peers. Real-time chat included.",
        stats: {
            count: "10k+",
            label1: "Users",
            uptime: "99%",
            rating: "4.7",
        },
        image: ["./images/dev1.jpg", "./images/dev2.jpg"],
    },
    4: {
        title: "TaskTrack – Team Task Manager",
        tags: ["Vue", "Firebase", "Tailwind"],
        status: "Coming Soon",
        description:
            "Team collaboration tool for tracking tasks, project timelines, and team goals with cloud sync.",
        stats: {
            count: "500+",
            label1: "Teams",
            uptime: "100%",
            rating: "4.9",
        },
        image: ["./images/task1.png", "./images/task2.png"],
    },
    5: {
        title: "TravelWise – Trip Planner",
        tags: ["Angular", "Node.js", "MySQL"],
        status: "Live",
        description:
            "Smart travel planner that helps users discover places, build itineraries, and book stays.",
        stats: {
            count: "2k+",
            label1: "Trips Planned",
            uptime: "98%",
            rating: "4.6",
        },
        image: ["./images/trip1.jpg", "./images/trip2.webp"],
    },
    6: {
        title: "FitFusion – Fitness Tracker",
        tags: ["React Native", "Express", "MongoDB"],
        status: "Coming Soon",
        description:
            "Mobile app to track workouts, meals, and fitness goals with real-time analytics and charts.",
        stats: {
            count: "3k+",
            label1: "Active Users",
            uptime: "100%",
            rating: "4.9",
        },
        image: ["./images/fitness1.jpg", "./images/fitness2.png"],
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

    // Add click event to project cards
    projectCards.forEach((card) => {
        card.addEventListener("click", function (e) {
            // Prevent modal from opening when clicking on links
            if (e.target.closest("a")) return;

            const projectId = this.getAttribute("data-project");
            const project = projects[projectId];

            if (!project) return;

            // Populate modal content
            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;

            // Set tags
            modalTags.innerHTML = "";
            project.tags.forEach((tag) => {
                const tagElement = document.createElement("span");
                tagElement.className = `tag tag-${tag
                    .toLowerCase()
                    .replace(".", "")
                    .replace("+", "plus")}`;
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

            // Set thumbnails
            thumbnailContainer.innerHTML = "";
            project.images.forEach((image, index) => {
                const thumbnail = document.createElement("div");
                thumbnail.className = `thumbnail${
                    index === 0 ? " active" : ""
                }`;
                thumbnail.innerHTML = `<img src="${image}" alt="${
                    project.title
                } Screenshot ${index + 1}">`;

                thumbnail.addEventListener("click", () => {
                    mainImage.src = image;
                    thumbnailContainer
                        .querySelectorAll(".thumbnail")
                        .forEach((t) => t.classList.remove("active"));
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

    // Close modal functionality
    function closeModal() {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }

    modal.querySelector(".close-modal").addEventListener("click", closeModal);
    modal
        .querySelector(".modal-backdrop")
        .addEventListener("click", closeModal);

    // Close modal with Escape key
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = "running";
            }
        });
    }, observerOptions);

    // Observe all project cards
    projectCards.forEach((card) => {
        observer.observe(card);
    });
});
