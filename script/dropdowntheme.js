document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggle = document.getElementById("dropdownToggle");
    const themeMenu = document.getElementById("themeMenu");

    // Toggle dropdown
    dropdownToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        this.classList.toggle("active");
        themeMenu.classList.toggle("show");
    });

    // Close when clicking outside
    document.addEventListener("click", function () {
        dropdownToggle.classList.remove("active");
        themeMenu.classList.remove("show");
    });

    // Theme selection
    const themeItems = document.querySelectorAll(".theme-item");
    themeItems.forEach((item) => {
        item.addEventListener("click", function () {
            const theme = this.getAttribute("data-theme");
            console.log("Theme selected:", theme);
            // Here you would implement your theme switching logic
            // document.documentElement.setAttribute('data-theme', theme);

            // Update dropdown text
            dropdownToggle.innerHTML = `${this.textContent.trim()} <i class="arrow"></i>`;

            // Close dropdown
            dropdownToggle.classList.remove("active");
            themeMenu.classList.remove("show");
        });
    });

    // Prevent dropdown from closing when clicking inside it
    themeMenu.addEventListener("click", function (e) {
        e.stopPropagation();
    });
});
