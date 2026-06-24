// import api from "./data.json";
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
const timer = document.getElementById("timer");
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

    if (selectMode) {
      let selectedMode = selectMode.textContent.trim().toLowerCase();
      console.log(selectedMode);

      if (selectedMode === "timed (60s)") {
        let timer = 10;
        let timerInterval = setInterval(() => {
          timer--;
          selectMode.textContent = `Time:${timer}s`;
          console.log("time baqi he", timer);

          if (timer <= 0) {
            clearInterval(timerInterval);
            passage.classList.add("blur");
            console.log("time up");
          }
        }, 1000);
      } else if (selectedMode === "passage") {
        console.log("Passage mode shuru! Koi timer nahi chalega.");
        // passage.innerText = data.hard[Math.round(Math.random() * 10)].text;
      }
    }
  });

  inputField.addEventListener("input", () => {
    const spans = passage.querySelectorAll("span");
    console.log(spans);

    const userTypedValue = inputField.value.split("");
    console.log(userTypedValue);

    spans.forEach((span, index) => {
      const userChar = userTypedValue[index];
      console.log(userChar);
      // console.log(span);
      // console.log(index);
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
  });
}
difficultyFuntion();
