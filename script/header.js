document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const navDropdown = document.querySelector(".nav-dropdown");

    // Function to close all dropdowns
    const closeAllDropdowns = () => {
        dropdownMenu.classList.remove("active");
        navDropdown.classList.remove("active");
        dropdownToggle.classList.remove("active");
        hamburger.classList.remove("active");
    };

    // Generic toggle function to manage dropdown states
    const toggleDropdown = (button, menu) => {
        const isActive = menu.classList.contains("active");
        closeAllDropdowns();
        if (!isActive) {
            button.classList.add("active");
            menu.classList.add("active");
        }
    };

    // Click events
    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleDropdown(hamburger, navDropdown);
    });

    dropdownToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleDropdown(dropdownToggle, dropdownMenu);
    });

    // Keyboard support for hamburger
    hamburger.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown(hamburger, navDropdown);
        }
    });

    // Keyboard support for theme dropdown toggle
    dropdownToggle.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown(dropdownToggle, dropdownMenu);
        }
    });

    // Close all dropdowns when clicking a nav link
    document.querySelectorAll(".nav-links-mobile a").forEach((link) => {
        link.addEventListener("click", (e) => {
            e.stopPropagation();
            closeAllDropdowns();
        });
    });

    // Close all dropdowns when clicking a theme item
    document.querySelectorAll(".theme-item").forEach((item) => {
        item.addEventListener("click", (e) => {
            e.stopPropagation();
            closeAllDropdowns();
        });
    });

    // Close dropdowns when clicking anywhere else
    document.addEventListener("click", (e) => {
        if (
            !dropdownToggle.contains(e.target) &&
            !dropdownMenu.contains(e.target) &&
            !hamburger.contains(e.target) &&
            !navDropdown.contains(e.target)
        ) {
            closeAllDropdowns();
        }
    });

    // Prevent clicks inside dropdowns from closing them
    dropdownMenu.addEventListener("click", (e) => {
        e.stopPropagation();
    });

    navDropdown.addEventListener("click", (e) => {
        e.stopPropagation();
    });
});
