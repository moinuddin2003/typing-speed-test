// import api from "./data.json";
const typingContainer = document.querySelector(".typing-area");
const FinalResult = document.getElementById("results");

const correctCharsDisplay = document.getElementById("correct-chars-count");
const wrongCharsDisplay = document.getElementById("wrong-chars-count");

const passage = document.getElementById("passage");
const startBtn = document.getElementById("startBtn");
const difficulty = document.querySelectorAll(
  ".control-group:first-child .control-button",
);

const inputField = document.getElementById("textArea");
const mode = document.querySelectorAll(
  ".control-group:last-child .control-button",
);
console.log(mode);
const hint = document.querySelector(".hint");

let totalMistakes = 0;
let secondPassed = 0;
let timerInterval = 0;
let selectedMode = "timed (60s)";
async function loadPassage() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    console.log(data);
    return data;
    // console.log(data.easy[0]);
    // console.log(data.easy[Math.round(Math.random() * length)]);
  } catch (error) {
    console.error(error);
  }
}

async function difficultyFuntion() {
  passage.classList.add("blur");

  const data = await loadPassage();

  if (data) {
    passage.innerText = data.hard[Math.round(Math.random() * 10)].text;

    difficulty.forEach((button) => {
      button.addEventListener("click", () => {
        console.log(difficulty);
        difficulty.forEach((btn) => {
          btn.classList.remove("selected");
          // te poore pr se sleected ura dega
        });
        button.classList.add("selected");
        // ye jispr click hogi uspr lgyga

        let buttonText = button.textContent.trim().toLowerCase();
        if (buttonText === "easy") {
          let easy = data.easy[Math.round(Math.random() * 10)];
          console.log(easy);
          // passage.innerText = easy.text;
          passage.textContent = "";
          const splitEasy = easy.text.split("");
          console.log(splitEasy);

          splitEasy.forEach((char) => {
            const span = document.createElement("span");

            span.innerText = char;
            passage.appendChild(span);
            console.log(span);
          });
        } else if (buttonText === "medium") {
          let medium = data.medium[Math.round(Math.random() * 10)];
          console.log(medium);
          passage.innerText = "";

          const splitMedium = medium.text.split("");

          splitMedium.forEach((char) => {
            const span = document.createElement("span");
            span.innerText = char;
            passage.appendChild(span);
          });
        } else {
          let hard = data.hard[Math.round(Math.random() * 10)];
          console.log(hard);
          passage.innerText = "";

          const splitHard = hard.text.split("");

          splitHard.forEach((char) => {
            const span = document.createElement("span");
            span.innerText = char;
            passage.appendChild(span);
          });
        }
      });
    });

    mode.forEach((btn) => {
      btn.addEventListener("click", () => {
        mode.forEach((button) => {
          button.classList.remove("selected");
        });
        btn.classList.add("selected");
      });
    });
  }

  startBtn.addEventListener("click", () => {
    passage.classList.remove("blur");
    startBtn.classList.add("hidden");
    hint.classList.add("hidden");
    inputField.focus();

    const selectMode = document.querySelector(
      ".control-group:last-child .control-button.selected",
    );

    console.log(selectMode);
    // gives <button type="button" class="control-button selected">Time:0s</button>

    if (selectMode) {
      selectedMode = selectMode.textContent.trim().toLowerCase();
      console.log(selectedMode);
      //gives timed (60sec)

      const timerValue = document.getElementById("time");
      let timer = 60;
      timerInterval = setInterval(() => {
        secondPassed++;
        console.log(secondPassed);
        if (selectedMode === "timed (60s)") {
          timer--;
          timerValue.textContent = `0:${timer}`;
          console.log("time baqi he", timer);

          if (timer <= 0) {
            clearInterval(timerInterval);
            passage.classList.add("blur");
            inputField.disabled = true;
            console.log("time up");

            typingContainer.classList.add("hidden");
            FinalResult.classList.remove("hidden");
          }
        } else if (selectedMode === "passage") {
          console.log("Passage mode shuru! Koi timer nahi chalega.");
          // passage.innerText = data.hard[Math.round(Math.random() * 10)].text;
        }
      }, 1000);
    }
  });

  inputField.addEventListener("input", (e) => {
    const spans = passage.querySelectorAll("span");
    console.log("Spans bhai", spans);

    const userTypedValue = inputField.value.split("");
    console.log("Use typed value", userTypedValue);

    const lastInputIndex = userTypedValue.length - 1;
    console.log(lastInputIndex);

    if (e.inputType !== "deleteContentBackward" && lastInputIndex >= 0) {
      const currentSpan = spans[lastInputIndex];
      const currentChar = userTypedValue[lastInputIndex];

      // user ne poora passage khatam kar liya?
      if (
        selectedMode === "passage" &&
        userTypedValue.length === spans.length
      ) {
        // 1. Timer ko furan rokh do!
        clearInterval(timerInterval);

        inputField.disabled = true;

        console.log(
          "Zabardast! User ne passage khatam kar liya. Total seconds lage:",
          secondPassed,
        );

        typingContainer.classList.add("hidden");
        FinalResult.classList.remove("hidden");
      }
      if (currentChar !== currentSpan.textContent) {
        totalMistakes++;
        console.log("Total Mistakes Done So Far:", totalMistakes);
      }
    }
    spans.forEach((span, index) => {
      const userChar = userTypedValue[index];
      console.log(userChar);
      // console.log(span);
      // console.log(index);

      span.classList.remove("correct", "incorrect", "cursor");

      if (index === userTypedValue.length) {
        span.classList.add("cursor");
      }

      if (userChar == null) {
        span.classList.remove("correct", "incorrect", "cursor");

        if (index === userTypedValue.length) {
          span.classList.add("cursor");
        }
      } else if (userChar === span.textContent) {
        // Agar user ka type kiya hua akshar span ke text se match ho gaya
        span.classList.add("correct");
        span.classList.remove("incorrect");
      } else {
        // Agar match nahi hua (galti ki)
        span.classList.add("incorrect");
        span.classList.remove("correct");
      }
    });

    let accuracyVal = 100;
    const accuracy = document.querySelectorAll("#accuracy , #result-accuracy");

    if (userTypedValue.length > 0) {
      let correctChar = userTypedValue.length - totalMistakes;

      if (correctChar < 0) {
        correctChar = 0;
      }

      accuracyVal = Math.round((correctChar / userTypedValue.length) * 100);
    }

    accuracy.forEach((element) => {
      element.textContent = `${accuracyVal}%`;
    });

    let wpmVal = 0;
    const wpm = document.querySelectorAll("#wpm, #result-wpm");

    if (secondPassed > 0 && userTypedValue.length > 0) {
      totalWords = userTypedValue.length / 5;
      console.log(totalWords);
      timePassedInMinutes = secondPassed / 60;
      console.log(timePassedInMinutes);
      wpmVal = Math.round(totalWords / timePassedInMinutes);
    }

    wpm.forEach((element) => {
      element.textContent = wpmVal;
    });

    correctCharsDisplay.textContent = correctChar;
    wrongCharsDisplay.textContent = totalMistakes;
  });

  // Screen par kahin bhi click ho, focus wapas input box par le aao
  document.addEventListener("click", () => {
    // Pehle check karo ke game khatam toh nahi hui (yani input disabled toh nahi hai)
    // Aur startBtn hidden hai (yani game shuru ho chuki hai)
    if (!inputField.disabled && startBtn.classList.contains("hidden")) {
      inputField.focus();
      console.log("Focus wapas input box par le aaya gaya!");
    }
  });
}
difficultyFuntion();
