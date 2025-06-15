// Project data
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
        description:
            "A sleek online bookstore with dynamic categories, Stripe integration, and user reviews.",
        features: [
            "Book search and filtering",
            "User reviews and ratings",
            "Stripe payment integration",
            "Admin dashboard",
            "Responsive design",
        ],
        images: ["./images/book0.jpg", "./images/book1.jpg"],
        codeLink: "#",
        demoLink: "#",
    },
    3: {
        title: "DevConnect – Developer Social Network",
        tags: ["React", "Node.js", "MongoDB"],
        description:
            "A community app for developers to post, like, comment, and connect with peers. Real-time chat included.",
        features: [
            "User profiles",
            "Post creation and commenting",
            "Real-time chat",
            "Code snippet sharing",
            "Developer job board",
        ],
        images: ["./images/dev1.jpg", "./images/dev2.jpg"],
        codeLink: "#",
        demoLink: "#",
    },
    4: {
        title: "TaskTrack – Team Task Manager",
        tags: ["Vue", "Firebase", "Tailwind"],
        description:
            "Team collaboration tool for tracking tasks, project timelines, and team goals with cloud sync.",
        features: [
            "Task management",
            "Team collaboration",
            "Project timelines",
            "Cloud sync",
            "Real-time updates",
        ],
        images: ["./images/task1.png", "./images/task2.png"],
        codeLink: "#",
        demoLink: "#",
    },
    5: {
        title: "TravelWise – Trip Planner",
        tags: ["Angular", "Node.js", "MySQL"],
        description:
            "Smart travel planner that helps users discover places, build itineraries, and book stays.",
        features: [
            "Destination discovery",
            "Itinerary builder",
            "Accommodation booking",
            "Travel tips",
            "Map integration",
        ],
        images: ["./images/trip1.jpg", "./images/trip2.webp"],
        codeLink: "#",
        demoLink: "#",
    },
    6: {
        title: "FitFusion – Fitness Tracker",
        tags: ["React Native", "Express", "MongoDB"],
        description:
            "Mobile app to track workouts, meals, and fitness goals with real-time analytics and charts.",
        features: [
            "Workout tracking",
            "Meal planning",
            "Progress charts",
            "Goal setting",
            "Community challenges",
        ],
        images: ["./images/fitness1.jpg", "./images/fitness2.png"],
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

    // Add click event to project cards and quick view buttons
    document
        .querySelectorAll(".project-card, .quick-view-btn")
        .forEach((element) => {
            element.addEventListener("click", function (e) {
                // Prevent modal from opening when clicking on links or if it's a quick view button inside a card
                if (
                    e.target.closest("a") ||
                    (this.classList.contains("quick-view-btn") &&
                        e.currentTarget !== e.target)
                ) {
                    return;
                }

                // Find the closest project card
                const card = this.classList.contains("project-card")
                    ? this
                    : this.closest(".project-card");
                if (!card) return;

                // Get project ID - try data-project first, then fallback to position
                let projectId = card.getAttribute("data-project");
                if (!projectId) {
                    // Fallback: get index based on position in grid
                    const cards = Array.from(
                        document.querySelectorAll(".project-card")
                    );
                    projectId = (cards.indexOf(card) + 1).toString();
                }

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
                if (project.features && project.features.length > 0) {
                    project.features.forEach((feature) => {
                        const li = document.createElement("li");
                        li.textContent = feature;
                        modalFeatures.appendChild(li);
                    });
                } else {
                    modalFeatures.innerHTML = "<li>No features listed</li>";
                }

                // Set images
                if (project.images && project.images.length > 0) {
                    mainImage.src = project.images[0];
                    mainImage.alt = project.title;

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
                }

                // Set links
                if (project.codeLink) {
                    codeLink.href = project.codeLink;
                    codeLink.style.display = "inline-flex";
                } else {
                    codeLink.style.display = "none";
                }

                if (project.demoLink) {
                    demoLink.href = project.demoLink;
                    demoLink.style.display = "inline-flex";
                } else {
                    demoLink.style.display = "none";
                }

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
    document.querySelectorAll(".project-card").forEach((card) => {
        observer.observe(card);
    });
});
