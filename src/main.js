import "../styles/style.css";
import "../styles/components/overlay.css";
import "../styles/components/figure.css";
import "../styles/utils.css";

import { stopTimer } from "./utils/timer.js";
import { initChoices, startGame } from "./utils/choices.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize choice handlers
  initChoices();

  const bg = document.querySelector("#bg-music");
  const slider = document.getElementById("volume-slider");

  // Volume control
  if (bg && slider) {
    slider.addEventListener("input", () => {
      bg.volume = slider.value;
    });
  }

  // Listen for hash changes to detect when scene2 is loaded
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash;

    if (
      hash === "" ||
      hash === "#scene0-overlay" ||
      hash === "#scene1-overlay"
    ) {
      if (bg) {
        bg.play().catch((err) => {
          console.warn("Autoplay blocked:", err);
        });
      }
    }

    // If user navigated to scene2, start the game
    if (hash === "#scene2-overlay") {
      startGame();
    }

    // If user goes back to scene0, stop timer and music
    if (hash === "#scene0-overlay" || hash === "") {
      stopTimer();
      if (bg) bg.pause();
    }
  });

  // Also check on page load if we're already on scene2
  if (window.location.hash === "#scene2-overlay") {
    startGame();
  }
});
