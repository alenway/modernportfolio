// =======================================
// === *** === *** === *** === *** === *** === *** === *** === *** === *** ===
// Section Project data
const projects = {
    1: {
        title: "E-commerce Platform",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        description:
            "A comprehensive e-commerce platform featuring advanced product management, secure payment processing, real-time inventory tracking, and detailed analytics. Built with modern technologies to ensure scalability and performance.",
        features: [
            "Advanced product catalog with smart filtering",
            "Secure JWT-based authentication system",
            "Integrated Stripe payment processing",
            "Real-time inventory management",
            "Comprehensive admin dashboard",
            "Customer review and rating system",
            "Order tracking and notifications",
            "Mobile-responsive design",
        ],
        images: ["./images/cat5.jpg", "./images/cat2.jpg", "./images/cat3.jpg"],
        codeLink: "https://github.com/yourusername/ecommerce-platform",
        demoLink: "https://ecommerce-demo.vercel.app",
    },
    2: {
        title: "Task Manager Pro",
        tags: ["Vue.js", "Firebase", "PWA"],
        description:
            "A collaborative task management application with real-time synchronization, drag-and-drop interface, and comprehensive project tracking. Designed for teams to enhance productivity and streamline workflow management.",
        features: [
            "Real-time collaboration with live updates",
            "Intuitive drag-and-drop task management",
            "Team member assignment and permissions",
            "Project timeline and milestone tracking",
            "Customizable task categories and labels",
            "File attachment and commenting system",
            "Progressive Web App capabilities",
            "Dark and light theme options",
        ],
        images: ["./images/cat2.jpg", "./images/cat3.jpg", "./images/cat4.jpg"],
        codeLink: "https://github.com/yourusername/task-manager-pro",
        demoLink: "https://taskmanager-demo.vercel.app",
    },
    3: {
        title: "CMS Enterprise",
        tags: ["Django", "PostgreSQL", "Docker"],
        description:
            "A scalable content management system with AI-powered features, advanced user management, and comprehensive analytics. Built for enterprise-level content operations with robust security and performance optimization.",
        features: [
            "AI-powered content recommendations",
            "Advanced user role and permission system",
            "Multi-site management capabilities",
            "SEO optimization tools and analytics",
            "Custom content types and fields",
            "Automated backup and version control",
            "API-first architecture with GraphQL",
            "Enterprise-grade security features",
        ],
        images: ["./images/cat3.jpg", "./images/cat4.jpg", "./images/cat5.jpg"],
        codeLink: "https://github.com/yourusername/cms-enterprise",
        demoLink: "https://cms-demo.vercel.app",
    },

    4: {
        title: "CMS Enterprise",
        tags: ["Django", "PostgreSQL", "Docker"],
        description:
            "A scalable content management system with AI-powered features, advanced user management, and comprehensive analytics. Built for enterprise-level content operations with robust security and performance optimization.",
        features: [
            "AI-powered content recommendations",
            "Advanced user role and permission system",
            "Multi-site management capabilities",
            "SEO optimization tools and analytics",
            "Custom content types and fields",
            "Automated backup and version control",
            "API-first architecture with GraphQL",
            "Enterprise-grade security features",
        ],
        images: ["./images/cat3.jpg", "./images/cat4.jpg", "./images/cat5.jpg"],
        codeLink: "https://github.com/yourusername/cms-enterprise",
        demoLink: "https://cms-demo.vercel.app",
    },

    5: {
        title: "CMS Enterprise",
        tags: ["Django", "PostgreSQL", "Docker"],
        description:
            "A scalable content management system with AI-powered features, advanced user management, and comprehensive analytics. Built for enterprise-level content operations with robust security and performance optimization.",
        features: [
            "AI-powered content recommendations",
            "Advanced user role and permission system",
            "Multi-site management capabilities",
            "SEO optimization tools and analytics",
            "Custom content types and fields",
            "Automated backup and version control",
            "API-first architecture with GraphQL",
            "Enterprise-grade security features",
        ],
        images: ["./images/cat3.jpg", "./images/cat4.jpg", "./images/cat5.jpg"],
        codeLink: "https://github.com/yourusername/cms-enterprise",
        demoLink: "https://cms-demo.vercel.app",
    },

    6: {
        title: "CMS Enterprise",
        tags: ["Django", "PostgreSQL", "Docker"],
        description:
            "A scalable content management system with AI-powered features, advanced user management, and comprehensive analytics. Built for enterprise-level content operations with robust security and performance optimization.",
        features: [
            "AI-powered content recommendations",
            "Advanced user role and permission system",
            "Multi-site management capabilities",
            "SEO optimization tools and analytics",
            "Custom content types and fields",
            "Automated backup and version control",
            "API-first architecture with GraphQL",
            "Enterprise-grade security features",
        ],
        images: ["./images/cat3.jpg", "./images/cat4.jpg", "./images/cat5.jpg"],
        codeLink: "https://github.com/yourusername/cms-enterprise",
        demoLink: "https://cms-demo.vercel.app",
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
