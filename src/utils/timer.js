// timer.js
let interval = null;
let remaining = 0;

export function startTimer(seconds, onEnd) {
  stopTimer();
  remaining = seconds;

  const el = document.querySelector("#time-remaining");
  if (el) el.textContent = remaining;

  interval = setInterval(() => {
    remaining--;
    if (el) el.textContent = remaining;

    if (remaining <= 0) {
      stopTimer();
      if (onEnd) onEnd();
    }
  }, 1000);
}

export function stopTimer() {
  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
}
