import { startTimer, stopTimer } from "./timer.js";

export const textA = [
  ["git add .", "git commit -m 'Leroi's pics'", "git push origin main"],
  ["git diff", "git rm .env", "git commit -m 'remove creds'"],
  ["git add .", "git commit -m 'CEO's wallet'", "git push"],
];

export const textB = [
  [
    "git status",
    "git add .",
    "git commit -m 'timer update'",
    "git push origin main",
  ],
  ["git add .env", "git commit -m 'passwords'", "git push origin main"],
  ["git add src/", "git reset secret.txt", "git commit -m 'update ui'"],
];

// Define which choices are "bad" for each step
// true = bad choice, false = good choice
const badChoices = {
  0: { A: true, B: false }, // Step 1: A is bad, B is good
  1: { A: false, B: true }, // Step 2: A is good, B is bad
  2: { A: true, B: false }, // Step 3: A is bad, B is good
};

// Messages for scene3 based on outcome
const endMessages = {
  timeout: {
    title: "Time's Up!",
    message: "You ran out of time. 7s tough and tight. Try again?",
  },
  3: {
    title: "Congratulations!",
    message:
      "You are savely cut out of cousins Lerois will, your boss fired you, and you have 0 followers on TikTok! We thank you for your generous contribution, though!",
  },
  2: {
    title: "Could Be Better",
    message:
      "You only managed to get two fronts onto your bad side! If you want our appreciation - manage 3!",
  },
  1: {
    title: "Not quite yet",
    message: "You are still puzzling us. Which side will you lean upon?",
  },
  0: {
    title: "Congratulations!",
    message:
      "You'll inherit cousin Lerois fortune, your boss loves you and you hit the top on TikTok! We, on the other hand, are not pleased!",
  },
};

let step = 0;
let userChoices = [];
let badChoiceCount = 0;
let gameEndedByTimeout = false;
const SECONDS_PER_CHOICE = 7;

function showStep(i) {
  const boxA = document.querySelector(".box-a");
  const boxB = document.querySelector(".box-b");

  if (boxA && textA[i]) {
    boxA.innerHTML = textA[i].join("<br>");
  }
  if (boxB && textB[i]) {
    boxB.innerHTML = textB[i].join("<br>");
  }
}

function handleChoice(choice) {
  // Record the choice
  userChoices.push(choice);

  // Check if this choice was bad
  if (badChoices[step][choice]) {
    badChoiceCount++;
  }

  // Check if this was the last choice
  if (step >= textA.length - 1) {
    stopTimer();
    gameEndedByTimeout = false;
    goToEndScene();
    return;
  }

  // Move to next step
  step++;
  showStep(step);
  startTimer(SECONDS_PER_CHOICE, timeExpired);
}

function timeExpired() {
  stopTimer();
  gameEndedByTimeout = true;
  goToEndScene();
}

function goToEndScene() {
  // Update the message in scene3 based on outcome
  updateScene3Message();

  window.location.hash = "#scene3-overlay";

  // Reset for next game (but keep the message visible)
  step = 0;
  userChoices = [];
  badChoiceCount = 0;
}

function updateScene3Message() {
  const titleEl = document.querySelector("#scene3-title");
  const messageEl = document.querySelector("#scene3-message");

  let content;

  if (gameEndedByTimeout) {
    content = endMessages.timeout;
  } else {
    content = endMessages[badChoiceCount];
  }

  if (titleEl) titleEl.textContent = content.title;
  if (messageEl) messageEl.textContent = content.message;
}

export function initChoices() {
  const btnA = document.querySelector(".a");
  const btnB = document.querySelector(".b");

  if (btnA)
    btnA.addEventListener("click", (e) => {
      e.preventDefault();
      handleChoice("A");
    });

  if (btnB)
    btnB.addEventListener("click", (e) => {
      e.preventDefault();
      handleChoice("B");
    });
}

// Called when user navigates to scene2
export function startGame() {
  step = 0;
  userChoices = [];
  badChoiceCount = 0;
  gameEndedByTimeout = false;
  stopTimer();

  // Show first step immediately
  showStep(step);

  // Start timer
  startTimer(SECONDS_PER_CHOICE, timeExpired);
}
