const button = document.querySelector(".audio-button");
const audio = document.getElementById("bg-audio");
const playIcon = button.querySelector(".icon-play");
const pauseIcon = button.querySelector(".icon-pause");

let isPlaying = false;

button.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "block";
    } else {
        audio.pause();
        playIcon.style.display = "block";
        pauseIcon.style.display = "none";
    }
    isPlaying = !isPlaying;
});

// Optional: Pause audio on page unload to avoid auto-play issues
window.addEventListener("beforeunload", () => {
    audio.pause();
});
