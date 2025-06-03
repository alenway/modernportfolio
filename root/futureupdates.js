// // tab theme customization

// function applyThemeColor() {
//     const themeColorMeta = document.querySelector("#theme-color-meta");
//     const isDark = document.body.classList.contains("theme-dark");

//     if (isDark) {
//         themeColorMeta.setAttribute("content", "#121212"); // or "#bb86fc" or "#03dac6"
//     } else {
//         themeColorMeta.setAttribute("content", "#ffffff"); // light theme default
//     }
// }

// // Run it once on page load
// applyThemeColor();

// // Run it whenever you switch themes
// document.querySelector("#theme-toggle").addEventListener("click", () => {
//     document.body.classList.toggle("theme-dark");
//     applyThemeColor();
// });

// // for tab icon customization according to theme
// // <link id="favicon" rel="icon" href="favicon-light.png">

// function applyFavicon() {
//     const favicon = document.getElementById("favicon");
//     const isDark = document.body.classList.contains("theme-dark");
//     favicon.href = isDark ? "favicon-dark.png" : "favicon-light.png";
// }
